//
// Giza, the tile pyramid
//
// Giza creates subtiles of lower levels from a vector tile format.
//
// Tile pyramids can be required for performance, precision, and most
// importantly correctness.
//
// --- Motivation
//
// Geospacial / mapping systems often work in tile systems, where increasing
// levels of zoom (z coordinate) represent a smaller geographical region,
// generally 1/4th of the area of the previous level.  For realtime or generative
// systems, you might not have precomputed all tile levels and therefore want a
// client side mechanism to produce the tiles on demand.  This can be required
// for a few reasons:
//
// - Correctness
//   Tiles are often represented in integer tile coordinates that are required
//   to be within a certain extent.  This means if you just tried to scale the
//   coordinates of a tile to produce a subtile, it is possible to produce
//   coordinates that are outside of the allowable coordinate space of whatever
//   system is being used.  This means that the subtiles are required to be
//   clipped to the appropriate extents.
//
// - Precision
//   As many systems use an integer tile coordinate scheme, the resolution of a
//   tile is connected to its level in the tile hierarchy.  Trying to produce a
//   subtile from a parent tile of integer coordinates will result in the the
//   subtile having the precision of the parent level and not of its own level.
//
// - Performance
//   Clipping and removing the data outside of a subtile's extend reduces the
//   amount of data, by culling / clipping the unneeded parent tile data.
//
//
// --- Implementation
//
// Giza produces arbitrary subtiles in the tile pyramid hierarchy from a base
// tile of a specified level.  It expects that this base tile is in floating
// point normalized "Web Mercator" coordinates in the range of 0 .. 1.  Note,
// that this differs from some systems that use a 0 .. 256 coordinate range.
// 
// Giza will then produce arbitrary by cutting the base tile (or subtiles) to
// produce the subtile of any level up to level 24.  Levels beyond 24 are not
// supported.  The subtiles will be culled / clipped to the subtile extents
// with a configurable level of "buffer" to allow some tile overflow which some
// systems use to reduce artifacts at tile boundaries.
//
// Giza will produce tiles in a vector tile like data structure, in integer
// tile coordinates.
//
// Giza only supports points and lines (but not polygons).  The data is
// represented in a custom datastructure referred to internally as "gz".
// This is simply and object with "points" and "lines" arrays, which
// contain the geometry and any tag metadata.
//
// {
//   points: [
//      {
//        // web mercator interleaved x/y, only a single point allowed
//        geometry: [ 0.29420931074354384, 0.3763381941592044 ],
//        tags: { },  // any metadata
//      },
//      ...
//   ],
//   lines: [
//     {
//       geometry: [
//         // Web mercator interleaved x/y to define a line.
//         // Multiple lines can be defined.
//         [ 0.2943557103474935, 0.37633961798972504,
//           0.29436064826117625, 0.37634287043422165, ... ],
//         ...
//       ],
//       tags: { },  // any metadata
//     }
//   ]
// }
//

// Tile Pyramid
function Giza(root, rx, ry, rz) {
  // The root tile.  This is the raw data in mercator coordinates and not yet
  // converted to integer tile coordinates, because we need the full precision
  // coordinate values for calculating the tile coordiantes of the tiles lower
  // in the pyramid.  Root is stored outside of the cache, and then the version
  // that has been converted to integer tile coordinates will be in the cache.
  this.root = root;  // Mercator coordinates

  // I hate that this is called buffer, but it is what geojson-vt and mapbox
  // call it.  It's additional space around a tile (outside of the tile
  // boundary) that is used to overdraw to help eliminate tile seams.  This
  // should be the amount for every side in tile coordinates.
  // NOTE: I would think to properly handle the buffer we would have to handle
  // wrapping around the world at the mercator boundaries, which would be
  // pretty complicated and we don't do it, so let's hope we don't have any
  // geometry in the eastern part of Russia.
  this.buffer = 64;

  // The root tile coordinates
  this.rx = rx; this.ry = ry; this.rz = rz;

  // Key'd on the id double (Number).
  this.cache = { };  // Integer tile coordinates

  this.extent = 8192;  // 2^13, mapbox internal integer coordinates

  // Initialize the cache with the root tile.
  this.storeTile(this.root, this.rx, this.ry, this.rz);
}

// convert (x, y, z) to unique number (integer as a double).
// Only valid for z <= 24, see: https://github.com/mapbox/geojson-vt/issues/87
// Should match mapbox's `uid` aka TileCoord#id.
function Giza_xyzToNum(x, y, z) {
  return ((1 << z) * y + x) * 32 + z;
}

Giza.prototype.storeTile = function(tile, x, y, z) {
  var id = Giza_xyzToNum(x, y, z);
  if (id in this.cache) throw "Collision / overwrite in storeTile";
  this.cache[id] = tile;
};

function Giza_filterPointFeatures(features, axis, a, b, out) {
  for (var i = 0, il = features.length; i < il; ++i) {
    var f = features[i];
    var v = f.geometry[axis];
    if (v >= a && v <= b) out.push(f);
  }
  return out;
}

function Giza_clipLineFeatures(features, axis, a, b, out) {
  var oxis = axis ^ 1; // Oppsite axis of `axis`.

  for (let i = 0, il = features.length; i < il; ++i) { // Features
    let l = features[i];
    let r = l.geometry;
    let segs = [ ];
    for (let k = 0, kl = r.length; k < kl; ++k) { // MultiLineString
      let g = r[k];
      let cur = [ ];
      segs.push(cur);
      for (let j = 3, jl = g.length; j < jl; j += 2) { // LineString
        let v0 = g[j-3+axis], v1 = g[j-1+axis];

        var v0v1a = ((v0 >= a) << 1) | (v1 >= a);
        if (v0v1a === 0) continue;  // o--o |  |
        var v0v1b = ((v0 >= b) << 1) | (v1 >= b);
        if (v0v1b === 3) continue;  // |  | o--o

        if ((v0v1a === 1 || v0v1b === 2) && cur.length !== 0) {
          cur = [ ];
          segs.push(cur);
        }

        if (v0v1a === 1 && cur.length !== 0) throw "ASSERT";
        if (v0v1a === 2 && v0v1b === 2 && cur.length !== 0) throw "ASSERT";
        if (v0v1a === 3 && v0v1b === 2 && cur.length !== 0) throw "ASSERT";

        if (cur.length === 0) {
          cur.push(g[j-3]); cur.push(g[j-2]);
        }
        cur.push(g[j-1]); cur.push(g[j  ]);

        // | o--o |  no clipping
        if (v0v1a === 3 && v0v1b === 0)
          continue;

        // clip one or both sides

        let o0 = g[j-3+oxis], o1 = g[j-1+oxis];

        if (v0v1a === 1) {
          cur[axis] = a;
          cur[oxis] = o0 + (o1 - o0) / (v1 - v0) * (a - v0);
          if (v0v1b === 1) {
            cur[2+axis] = b;
            cur[2+oxis] = o0 + (o1 - o0) / (v1 - v0) * (b - v0);
          }
        }

        if (v0v1a === 2) {
          let q = cur.length - 2;
          if (v0v1b === 2) {
            cur[axis] = b;
            cur[oxis] = o0 + (o1 - o0) / (v1 - v0) * (b - v0);
          }
          cur[q+axis] = a;
          cur[q+oxis] = o0 + (o1 - o0) / (v1 - v0) * (a - v0);
        }

        if (v0v1a === 3) {
          let q = v0v1b === 2 ? 0 : cur.length - 2;
          cur[q+axis] = b;
          cur[q+oxis] = o0 + (o1 - o0) / (v1 - v0) * (b - v0);
        }
      }
      if (cur.length === 0) segs.pop();
    }
    if (segs.length === 0) continue;
    out.push({
      geometry: segs,
      tags: l.tags
    });
  }
  return out;
}

Giza.prototype.buildLevelDownFromTile = function(tile, x, y, z) {
  z += 1;
  x <<= 1;
  y <<= 1;

  var z2 = 1 << z;
  var w  = 1 / z2;
  var tx = x * w;
  var ty = y * w;
  var s  = z2 * this.extent;
  var e  = this.buffer / s;

  // Split into 4 tiles one level lower,   A  B
  //                                       C  D
  var pabcd = tile.points;
  var pac = Giza_filterPointFeatures(pabcd, 0, tx     - e, tx + w     + e, [ ]);
  var pbd = Giza_filterPointFeatures(pabcd, 0, tx + w - e, tx + w + w + e, [ ]);

  var pa  = Giza_filterPointFeatures(pac  , 1, ty     - e, ty + w     + e, [ ]);
  var pc  = Giza_filterPointFeatures(pac  , 1, ty + w - e, ty + w + w + e, [ ]);
  var pb  = Giza_filterPointFeatures(pbd  , 1, ty     - e, ty + w     + e, [ ]);
  var pd  = Giza_filterPointFeatures(pbd  , 1, ty + w - e, ty + w + w + e, [ ]);

  var labcd = tile.lines;
  var lac = Giza_clipLineFeatures(   labcd, 0, tx     - e, tx + w     + e, [ ]);
  var lac = Giza_clipLineFeatures(   labcd, 0, tx     - e, tx + w     + e, [ ]);
  var lbd = Giza_clipLineFeatures(   labcd, 0, tx + w - e, tx + w + w + e, [ ]);

  var la  = Giza_clipLineFeatures(   lac  , 1, ty     - e, ty + w     + e, [ ]);
  var lc  = Giza_clipLineFeatures(   lac  , 1, ty + w - e, ty + w + w + e, [ ]);
  var lb  = Giza_clipLineFeatures(   lbd  , 1, ty     - e, ty + w     + e, [ ]);
  var ld  = Giza_clipLineFeatures(   lbd  , 1, ty + w - e, ty + w + w + e, [ ]);

  this.storeTile({points: pa, lines: la}, x    , y    , z);
  this.storeTile({points: pb, lines: lb}, x + 1, y    , z);
  this.storeTile({points: pc, lines: lc}, x    , y + 1, z);
  this.storeTile({points: pd, lines: ld}, x + 1, y + 1, z);
};

// From our tile format (and mercator coordinates) to the
// mapbox VT format (and tile coordinates);
function Giza_gzToVT(tile, x, y, z, extent) {
  const kTypePoint = 1;
  const kTypeLine  = 2;
  const kTypePoly  = 3;

  var z2 = 1 << z;
  var w  = 1 / z2;
  var tx = x * w;
  var ty = y * w;
  var s  = z2 * extent;

  var features = [ ];
  var ps = tile.points;
  for (let i = 0, il = ps.length; i < il; ++i) {
    let f = ps[i];
    let p = f.geometry;
    p = new Point(Math.round((p[0] - tx) * s), Math.round((p[1] - ty) * s));
    features.push({
      type: kTypePoint,
      geometry: [[p]],
      tags: f.tags
    });
  }

  var ls = tile.lines;
  for (let i = 0, il = ls.length; i < il; ++i) {  // Features
    let l = ls[i];
    let r = l.geometry;
    let d = [ ];
    for (let k = 0, kl = r.length; k < kl; ++k) {  // MultiLineString
      let g = r[k];
      let o = [ ];
      for (let j = 1, jl = g.length; j < jl; j += 2) {  // LineString
        let px = g[j-1], py = g[j];
        o.push(new Point(Math.round((px - tx) * s), Math.round((py - ty) * s)));
      }
      if (o.length === 0) throw "ASSERT";
      d.push(o);
    }
    if (d.length === 0) throw "ASSERT";
    features.push({
      type: kTypeLine,
      geometry: d,
      tags: l.tags
    });
  }

  return {features: features};
}

Giza.prototype.buildTile = function(x, y, z) {
  // Coordinates for search for a parent tile
  var px = x, py = y, pz = z;
  var pt = undefined;

  while (pz >= this.rz) {  // Should never go past our root tile
    // Coordinate for the tile parent tile one level above in the pyramid.
    var pid = Giza_xyzToNum(px, py, pz);
    pt = this.cache[pid];
    if (pt !== undefined) break;
    px >>= 1; py >>= 1; --pz;
  }

  if (pt === undefined) throw "Unable to find parent tile!";

  var tile = pt;

  while (pz < z) { // Build out the pyramid down to the tile.
    this.buildLevelDownFromTile(tile, px, py, pz);
    ++pz; px = x >>> (z - pz); py = y >>> (z - pz);
    var id = Giza_xyzToNum(px, py, pz);
    tile = this.cache[id];
    if (tile === undefined) throw "Could not get tile! " + [x, y, z].join(', ');
  }

  return Giza_gzToVT(tile, x, y, z, this.extent);
};
