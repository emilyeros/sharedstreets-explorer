// The workers are arranged so we can inject a script into
// the worker, but the mapbox-gl internals are basically private.
// When this code is called `this` is just the DedicatedWorkerGlobalScope
// and there isn't really anything in the global space so we don't
// have any references to dig into the internals.

//importScripts(origin + "/geojson-vt.js");
importScripts(origin + "/giza.js");
importScripts(origin + "/sharedstreets.proto.js");

const GeoJSONWorkerSource = mapboxDereq("./geojson_worker_source");
const Point = mapboxDereq("@mapbox/point-geometry");
const VectorTileWorkerSource = mapboxDereq("./vector_tile_worker_source");
const EXTENT = mapboxDereq('../data/extent');
const vtpbf = mapboxDereq('vt-pbf');

const kBaseTileLevel = 11;

var PerfTimer = (function() {
  if (!console.time || !console.timeEnd) {
    return function(name) {
      this.end = function() { };
    };
  }

  return function(name) {
    console.time(name);
    this.end = function() {
      console.timeEnd(name);
    };
  };
})();

// Based on projectPoint from geojson-vt
// This returns x and y between 0 .. 1, with an upper left // corner (0, 0)
// (north of Japan) and bottom right of (1, 1) (Antartica south of New Zealand).
function webMercator(x, y) {
  var sin = Math.sin(y * Math.PI / 180);
  y = (0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI);
  return [x / 360 + 0.5, y < 0 ? 0 : y > 1 ? 1 : y];
}

function webMercator$(x, y, out) {
  var sin = Math.sin(y * Math.PI / 180);
  y = (0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI);
  out[0] = x / 360 + 0.5;
  out[1] = y < 0 ? 0 : y > 1 ? 1 : y;
}

class AJAXError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

function makeRequest(requestParameters) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', requestParameters.url, true);
  for (var k in requestParameters.headers) {
    xhr.setRequestHeader(k, requestParameters.headers[k]);
  }
  xhr.withCredentials = requestParameters.credentials === 'include';
  return xhr;
}

function getJSON(requestParameters, callback) {
  var xhr = makeRequest(requestParameters);
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onerror = function() {
    callback(new Error(xhr.statusText));
  };
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300 && xhr.response) {
      let data;
      try {
        data = JSON.parse(xhr.response);
      } catch (err) {
        return callback(err);
      }
      callback(null, data);
    } else {
      callback(new AJAXError(xhr.statusText, xhr.status));
    }
  };
  xhr.send();
  return xhr;
};

function doFetchPromised(url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onerror = function() {
      reject(new Error(xhr.statusText));
    };
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300 && xhr.response) {
        try {
          resolve(xhr.response);
        } catch (err) {
          reject(err);
        }
      } else {
        reject(new AJAXError(xhr.statusText, xhr.status));
      }
    };
    xhr.open('GET', url, true);
    xhr.responseType = "arraybuffer";
    //xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Accept', 'application/x-google-protobuf');
    //for (var k in requestParameters.headers) {
      //xhr.setRequestHeader(k, requestParameters.headers[k]);
    //}
    //xhr.withCredentials = requestParameters.credentials === 'include';
    xhr.send();
  });
}


function TiledGeoJSONWorkerSource(actor, layerIndex) {
  VectorTileWorkerSource.call(this, actor, layerIndex, this.customLoadVectorData);
  this._baseZ = kBaseTileLevel;
  this._baseSSTiles = { };
}
Object.setPrototypeOf(TiledGeoJSONWorkerSource.prototype, VectorTileWorkerSource.prototype);

TiledGeoJSONWorkerSource.transformSSJSONToSSTile = function(params, tile) {
  //debugger;

  const kExtent = 8192;  // 2^13, mapbox internal integer coordinates

  var z2 = 1 << params.coord.z;
  var tx = params.coord.x / z2;
  var ty = params.coord.y / z2;
  var s  = z2 * kExtent;

  const kTypePoint = 1;
  const kTypeLine  = 2;
  const kTypePoly  = 3;

  let lines = [ ];
  let points = [ ];

  var tmpc = [0, 0];

  let geom = tile.geometries;
  for (let key in geom) {
    var g = geom[key];
    let c = g.coordinates;
    let cs = [ ];
    for (let j = 0, jl = c.length; j < jl; ++j) {
      let xy = c[j];
      webMercator$(xy[0], xy[1], tmpc);
      cs.push(tmpc[0]); cs.push(tmpc[1]);
    }
    // Adapt into the expected vector tile JSON format.
    // NOTE(deanm): We call our id `sid` because `id` is internally
    // special and wanted to be a 10-bit number (see geojson_wrapper).
    lines.push({
      geometry: [cs],
      tags: {sid: key, type: 'geometry'},
    });
  }

  let inter = tile.intersections;
  for (let key in inter) {
    var g = inter[key];
    let xy = g.point;
    webMercator$(xy[0], xy[1], tmpc);
    points.push({
      geometry: [tmpc[0], tmpc[1]],
      tags: {sid: key, type: 'intersection'},
    });
  }

  let refs = tile.references;
  for (let key in refs) {
    var g = refs[key];
    var locrefs = g.locationReferences;
    if (locrefs.length !== 2) { debugger; }
    let cs = [ ];
    for (let i = 0; i < 2; ++i) {
      let xy = locrefs[i].point;
      webMercator$(xy[0], xy[1], tmpc);
      cs.push(tmpc[0]); cs.push(tmpc[1]);
    }
    lines.push({
      geometry: [cs],
      tags: {sid: key, type: 'reference',
             outboundIntersectionId: locrefs[0].intersectionId,
             outboundBearing: locrefs[0].outboundBearing,
             inboundIntersectionId:  locrefs[1].intersectionId,
             inboundBearing:  locrefs[1].inboundBearing},
    });
  }

  return {points: points, lines: lines};
};

    // Adapt into the expected vector tile JSON format.
    // NOTE(deanm): We call our id `sid` because `id` is internally
    // special and wanted to be a 10-bit number (see geojson_wrapper).

TiledGeoJSONWorkerSource.transformSSPbfIntersectionsAndAddToSSTile = function(pbf, sstile) {
  var points = sstile.points;
  var tmpc = [0, 0];
  var intersections = new protobuf.Reader(pbf);
  while (intersections.pos < intersections.len) {
    var g = protobuf.roots.default.SharedStreetsIntersection.decodeDelimited(intersections);
    webMercator$(g.lon, g.lat, tmpc);
    points.push({
      geometry: [tmpc[0], tmpc[1]],
      tags: {sid: g.id, type: 'intersection'},
    });
  }
};

TiledGeoJSONWorkerSource.transformSSPbfGeometriesAndAddToSSTile = function(pbf, sstile) {
  var lines = sstile.lines;
  var tmpc = [0, 0];
  var geometries = new protobuf.Reader(pbf);
  while (geometries.pos < geometries.len) {
    var g = protobuf.roots.default.SharedStreetsGeometry.decodeDelimited(geometries);
    var ll = g.latlons;
    let cs = [ ];
    for (let i = 1, il = ll.length; i < il; i += 2) {
      webMercator$(ll[i], ll[i-1], tmpc);
      cs.push(tmpc[0]); cs.push(tmpc[1]);
    }
    lines.push({
      geometry: [cs],
      tags: {sid: g.id, type: 'geometry'},
    });
  }
};

TiledGeoJSONWorkerSource.transformSSPbfReferencesAndAddToSSTile = function(pbf, sstile) {
  var lines = sstile.lines;
  var tmpc = [0, 0];
  var references = new protobuf.Reader(pbf);
  while (references.pos < references.len) {
    var g = protobuf.roots.default.SharedStreetsReference.decodeDelimited(references);
    var locrefs = g.locationReferences;
    if (locrefs.length !== 2) { debugger; continue; }
    let cs = [ ];
    for (let i = 0; i < 2; ++i) {
      let lr = locrefs[i];
      webMercator$(lr.lon, lr.lat, tmpc);
      cs.push(tmpc[0]); cs.push(tmpc[1]);
    }
    lines.push({
      geometry: [cs],
      tags: {sid: g.id, type: 'reference',
             outboundIntersectionId: locrefs[0].intersectionId,
             outboundBearing: locrefs[0].outboundBearing,
             inboundIntersectionId:  locrefs[1].intersectionId,
             inboundBearing:  locrefs[1].inboundBearing},
    });
  }
};

function SSFeatureWrapper(feature) {
  this._feature = feature;
  this.extent = EXTENT;
  this.type = feature.type;
  this.properties = feature.tags;
/*
  if ('id' in feature && !isNaN(feature.id)) {
      this.id = parseInt(feature.id, 10);
  }
*/
}

SSFeatureWrapper.prototype.loadGeometry = function() {
  return this._feature.geometry;
};

SSFeatureWrapper.prototype.toGeoJSON = function() {
  debugger;
//FeatureWrapper.prototype.toGeoJSON = VectorTileFeature.prototype.toGeoJSON
};

// conform to vectortile api
function SSWrapper(features) {
  this.layers = { '_geojsonTileLayer': this };
  this.name = '_geojsonTileLayer';
  this.extent = EXTENT;
  this.length = features.length;
  this._features = features;
}

SSWrapper.prototype.feature = function(i) {
  return new SSFeatureWrapper(this._features[i])
};

TiledGeoJSONWorkerSource.customLoadTile = function(tile, callback) {
  const wrapped = new SSWrapper(tile.features);

  // Encode the geojson-vt tile into binary vector tile form form.  This
  // is a convenience that allows `FeatureIndex` to operate the same way
  // across `VectorTileSource` and `GeoJSONSource` data.
  let pbf = vtpbf(wrapped);
  if (pbf.byteOffset !== 0 || pbf.byteLength !== pbf.buffer.byteLength) {
    // Compatibility with node Buffer (https://github.com/mapbox/pbf/issues/35)
    pbf = new Uint8Array(pbf);
  }

  callback(null, {
    vectorTile: wrapped,
    rawData: pbf.buffer
  });
};

TiledGeoJSONWorkerSource.prototype.fetchSSTile = function(params, callback) {
  var ss = this._baseSSTiles[params.source];
  if (ss === undefined) {
    ss = this._baseSSTiles[params.source] = { };
  }

  var c = params.coord;
  var dz = c.z - this._baseZ;
  if (dz < 0) throw "xxx";

  var url = params.request.url;
  var bx = c.x >>> dz, by = c.y >>> dz, bz = this._baseZ;

  var key = bz + "-" + bx + "-" + by;
  var s = ss[key];

  if (s === undefined) {
    s = ss[key] = {loaded: false, loading: true, waiters: [ ], rawpbf: null, sstile: null, giza: null};

    //let burl = url.substr(0, url.lastIndexOf("/")) + "/" + key + ".json";
    let burl = url + key;// + ".intersection.pbf";

    function scallback(err, res) {
      console.log("Finished with " + s.waiters.length + " extra waiters " + burl);
      callback(err, res);
      for (var i = 0, il = s.waiters.length; i < il; ++i) {
        s.waiters[i](err, res);
      }
    }

    var tname = burl;
    //var jsont = new PerfTimer("getJSON combined json " + tname);
    var fetcht = new PerfTimer("ss protobuf " + tname);
    console.log("fetching ss data " + burl);
    /*
    getJSON({url: burl}, (err, res) => {
      s.loading = false;
      jsont.end();
      //if (err) return;
      if (err) {
        console.log("Failed SS Tile fetch: " + tname + " " + burl);
        return scallback(err, res);
      }
      s.loaded = true;
      s.json = res;
      var t = new PerfTimer("json to vector tile json " + tname);
      s.sstile = TiledGeoJSONWorkerSource.transformSSJSONToSSTile(params, res);
      t.end();
      s.giza = new Giza(s.sstile, bx, by, bz);
      scallback(null, s);
    });
    */

    // This is a little bit of a complicated promise chain, but the basically idea is
    // just to fan out the multiple requests and "join" back when they have all finished.
    Promise.all(["geometry", "intersection", "reference"].map(x => {
      let fetchurl = burl + "." + x + ".pbf";
      var fetcht = new PerfTimer("ss protobuf " + x + " " + tname);
      console.log("fetching ss data " + fetchurl);
      return doFetchPromised(fetchurl).finally(() => fetcht.end());
    })).finally(() => {
      // NOTE: finally called first will still pass through the promise, so it
      // allows us to do some common before code (whereas normally it is used
      // for common after code, but it works the other way around too).
      s.loading = false;
    }).then(res => {
      s.loaded = true;
      s.rawpbfs = res;
      s.sstile = {lines: [ ], points: [ ]};
      var t = new PerfTimer("pbfs to vector tile json " + tname);
      TiledGeoJSONWorkerSource.transformSSPbfGeometriesAndAddToSSTile(new Uint8Array(res[0]), s.sstile);
      TiledGeoJSONWorkerSource.transformSSPbfIntersectionsAndAddToSSTile(new Uint8Array(res[1]), s.sstile);
      TiledGeoJSONWorkerSource.transformSSPbfReferencesAndAddToSSTile(new Uint8Array(res[2]), s.sstile);
      t.end();
      s.giza = new Giza(s.sstile, bx, by, bz);
      scallback(null, s);
    }, err => {
      console.log("Failed to fetch SS Tile pbfs: " + tname + " " + burl);
      return scallback(err, null);
    });
  } else if (s.loading === true) {
    s.waiters.push(callback);
  } else if (s.loaded === true) {
    console.log("giza already available for " + key);
    callback(null, s);
  }
};

TiledGeoJSONWorkerSource.prototype.customLoadVectorData = function(params, callback) {
  console.log('customLoadVectorData');
  console.log(params);
  this.fetchSSTile(params, (err, res) => {
    if (err) return callback(err, res);
    var c = params.coord;
    var giza = res.giza;
    var tname = [c.z, c.x, c.y].join('-');
    var t = new PerfTimer("giza.buildTile " + tname);
    vt = giza.buildTile(c.x, c.y, c.z);
    t.end();
    t = new PerfTimer("customLoadTile " + tname);
    TiledGeoJSONWorkerSource.customLoadTile(vt, callback);
    t.end();
  });
};

registerWorkerSource('tiled-geojson', TiledGeoJSONWorkerSource);
