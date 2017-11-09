// The workers are arranged so we can inject a script into
// the worker, but the mapbox-gl internals are basically private.
// When this code is called `this` is just the DedicatedWorkerGlobalScope
// and there isn't really anything in the global space so we don't
// have any references to dig into the internals.

importScripts(origin + "/geojson-vt.js");

const GeoJSONWorkerSource = mapboxDereq("./geojson_worker_source");
const Point = mapboxDereq("@mapbox/point-geometry");
const VectorTileWorkerSource = mapboxDereq("./vector_tile_worker_source");
const EXTENT = mapboxDereq('../data/extent');
const vtpbf = mapboxDereq('vt-pbf');

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

function TiledGeoJSONWorkerSource(actor, layerIndex) {
  VectorTileWorkerSource.call(this, actor, layerIndex, TiledGeoJSONWorkerSource.customLoadVectorData);
}
Object.setPrototypeOf(TiledGeoJSONWorkerSource.prototype, VectorTileWorkerSource.prototype);

// https://tools.ietf.org/html/rfc7946#section-1.4
// o  Inside this document, the term "geometry type" refers to seven
//    case-sensitive strings: "Point", "MultiPoint", "LineString",
//    "MultiLineString", "Polygon", "MultiPolygon", and
//    "GeometryCollection".
//
// o  As another shorthand notation, the term "GeoJSON types" refers to
//    nine case-sensitive strings: "Feature", "FeatureCollection", and
//    the geometry types listed above.
TiledGeoJSONWorkerSource.transformGeoJSONToVectorTileJSON = function(params, tile) {
  //debugger;

  const kExtent = 8192;  // 2^13, mapbox internal integer coordinates

  var z2 = 1 << params.coord.z;
  var tx = params.coord.x / z2;
  var ty = params.coord.y / z2;
  var s  = z2 * kExtent;

  const kTypePoint = 1;
  const kTypeLine  = 2;
  const kTypePoly  = 3;

  let features = [ ];

  var tmpc = [0, 0];

  let geom = tile.geometries;
  for (let key in geom) {
    var g = geom[key];
    let c = g.coordinates;
    let cs = [ ];
    for (let j = 0, jl = c.length; j < jl; ++j) {
      let xy = c[j];
      webMercator$(xy[0], xy[1], tmpc);
      // Convert to (integer) tile coordinates
      cs.push(new Point(Math.round((tmpc[0] - tx) * s), Math.round((tmpc[1] - ty) * s)));
    }
    // Adapt into the expected vector tile JSON format.
    // NOTE(deanm): We call our id `sid` because `id` is internally
    // special and wanted to be a 10-bit number (see geojson_wrapper).
    features.push({
      geometry: [cs],
      type: kTypeLine,
      tags: {sid: key, type: 'geometry'},
    });
  }

  let inter = tile.intersections;
  for (let key in inter) {
    var g = inter[key];
    var cs = [ ];
    let xy = g.point;
    webMercator$(xy[0], xy[1], tmpc);
    // Convert to (integer) tile coordinates
    cs.push(new Point(Math.round((tmpc[0] - tx) * s), Math.round((tmpc[1] - ty) * s)));
    // Adapt into the expected vector tile JSON format.
    features.push({
      geometry: [cs],
      type: kTypePoint,
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
      // Convert to (integer) tile coordinates
      // Adapt into the expected vector tile JSON format.
      cs.push(new Point(Math.round((tmpc[0] - tx) * s), Math.round((tmpc[1] - ty) * s)));
    }
    features.push({
      geometry: [cs],
      type: kTypeLine,
      tags: {sid: key, type: 'reference',
             outboundIntersectionId: locrefs[0].intersectionId,
             outboundBearing: locrefs[0].outboundBearing,
             inboundIntersectionId:  locrefs[1].intersectionId,
             inboundBearing:  locrefs[1].inboundBearing},
    });
  }

  return {features: features};
}

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

TiledGeoJSONWorkerSource.customLoadVectorData = function(params, callback) {
  var tname = params.request.url;
  var jsont = new PerfTimer("getJSON combined json " + tname);
  getJSON(params.request, (err, res) => {
    jsont.end();
    //if (err) return;
    if (err) return callback(err, res);
    var t = new PerfTimer("json to vector tile json " + tname);
    var vt = TiledGeoJSONWorkerSource.transformGeoJSONToVectorTileJSON(params, res);
    t.end();
    t = new PerfTimer("load geo json tile " + tname);
    TiledGeoJSONWorkerSource.customLoadTile(vt, callback);
    t.end();
  });
};

registerWorkerSource('tiled-geojson', TiledGeoJSONWorkerSource);
