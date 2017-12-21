// An overview of the typical flow of a Source:
// The mapbox-gl internal implementations are heavily based on
// web workers, which means there is a lot of async / message passing,
// and anyway that is generally how mapbox-gl is built.
// 
// - Register a type with addSourceType
// - Load a layer with a source using that type, this will create 
//   a SourceCache and that will construct the Source through
//   the source factory create() which will dispatch the constructor
//   based on the registration table (which we just added to above).
// - The SourceCache will listen for onAdd and then dispatch the event
//   to the source (if an onAdd method exists).
// - In response to onAdd, typically metadata is fetched (tilejson, etc),
//   ('dataloading' is also fired before metadata but doesn't seem important)
//   and then in response to this a 'data' event with sourceDataType: 'metadata'
//   is fired.  This gets propagated to the SourceCache via the "eventedParent"
//   that was passed into the constructor (this is the SourceCache).
// - Firing metadata to the SourceCache will caused its _sourcesLoaded to be
//   set to true, which indicates that it's okay to call loadTile.
// - loadTile is called with the information about which tile to load, this
//   would normally dispatch whatever requests to fetch the tile data (usually
//   dispatching a request to a worker, and the worker will do the network
//   fetch and handle the protobuf / VectorTile, etc).
// - When loadTile is finished, it will call the callback it was supplied,
//   which will go back into the SourceCache (_tileLoaded), which will in
//   turn fire a 'data' event on the Source.

window.TiledGeoJSON = { };

// Stick this all in a closure for now to get `map`.
window.TiledGeoJSON.registerSource = function(map) {

function TiledGeoJSONSource(id, specification, dispatcher, eventedParent) {
  var VectorTileSource = map.style.sourceCaches.composite._source.constructor;
  // Should be the same as `this.__proto__.__proto__ = VectorTileSource.prototype`.
  Object.setPrototypeOf(TiledGeoJSONSource.prototype, VectorTileSource.prototype);

  // We need to make sure that all requests go to the same worker, whereas a
  // normal vector tile source could dispatch to a pool a workers.  This is
  // because we don't want to reload parent tiles and a tile could be
  // dispatched to a worker that doesn't have the parent tile when another
  // worker does.
  this.workerID = undefined;
  var shimpatcher = {
    send: (type, data, callback, targetID, buffers) => {
      console.log('Shimpatcher dispatch workerID: ' + this.workerID);
      if (targetID !== undefined && targetID != this.workerID) throw "xxx";
      return this.workerID = dispatcher.send(type, data, callback, this.workerID, buffers);
    }
  };
  VectorTileSource.call(this, id, specification, shimpatcher, eventedParent);

  // Overrides type = 'vector' set by VectorTileSource, this is important because
  // it is the type that goes into messages to route to the correct worker.
  this.type = 'tiled-geojson';

	/*
  this.minzoom = 0;
  this.maxzoom = 10;
  this.tileSize = 512;
  this.isTileClipped = true;
  this.reparseOverscaled = true;
	*/

  this.minzoom = this.maxzoom = 10;

  // Otherwise tiles > maxzoom would be requested again from the worker to give
  // it a chance to "reparse", for example in the context of geojson I guess
  // this would allow for you to recalculate the simplification from the
  // original geometry based on whatever zoom level.  Anyway, we don't do any
  // simplification now and we aren't setup to handle requests for > maxzoom.
  // TODO(deanm): Actually we do want this, so that we can recalculate the
  // integer tile coordinates for better precision...
  this.reparseOverscaled = false;

  // The tiles now have features binned so don't clip them.
  this.isTileClipped = false;
}

// We can't specify a relative URL here because it will be
// loaded with importScripts but the worker page is a blob://
// URL because that's how the webworkify builds them out.
TiledGeoJSONSource.workerSourceURL = document.location.origin + "/tiled_geojson_worker_source.js";

/*
// Should return a JSON.stringify-able object that when used again to
// create a store should get back to the same state.
TiledGeoJSONSource.prototype.serialize = function() {
  return { };
};
*/

TiledGeoJSONSource.prototype.hasTile = function(coord) {
	//return coord.z === 10 && coord.x === 301 && (coord.y === 384 || coord.y === 385);
	return true;
};

/*
TiledGeoJSONSource.prototype.onAdd = function(map) {
  console.log('onAdd');
  this.fire('data', {dataType: 'source', sourceDataType: 'metadata'});
};

TiledGeoJSONSource.prototype.loadTile = function(tile, cb) {
};
*/

  map.style.addSourceType('tiled-geojson', TiledGeoJSONSource, (err, res) => { } );
}
