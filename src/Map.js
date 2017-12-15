import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import {request as request} from 'd3-request';
import { map as _map} from 'underscore';
import { filter as _filter} from 'underscore';
import { first as _first} from 'underscore';
import { last as _last} from 'underscore';
import { Reader, load as protoLoad }  from "protobufjs";
import helpers from "@turf/helpers";
import lineOffset from "@turf/line-offset";
import destination from "@turf/destination";
import SphericalMercator from "@mapbox/sphericalmercator";
import protobuf from "protobufjs"

mapboxgl.accessToken = 'pk.eyJ1IjoidHJhbnNwb3J0cGFydG5lcnNoaXAiLCJhIjoiY2oyZ2R1aTk2MDdteDMyb2dibXpuMjdweiJ9.RtukedapVNqEAsYU-f1Vaw';

const sphericalMercator = new SphericalMercator({
    size: 256
});

export default class Map extends React.Component {

  constructor(props: Props) {
    super(props);

    this.state = {
      lng: -74.00390625,
      lat:  40.58058466,
      zoom: 14.0
    };
  }

  showIntersectionLayer() {

    var intersectionFeatures = this.generateIntersectionFeatures();

    if(!this.map.getLayer("intersections") && this.mapLoaded ) {

      this.map.addSource("intersection-data", {
         "type": "geojson",
         "data": intersectionFeatures
      });

      this.map.addLayer({
        "id": "intersections",
        "type": "circle",
        "source": "intersection-data",
        "paint": {
              // make circles larger as the user zooms from z12 to z22
              'circle-radius': {
                  'base': 1.0,
                  'stops': [[12, 1], [22, 15]]
              },
              // color circles by ethnicity, using data-driven styles
              'circle-color':"#cccccc",
              'circle-opacity': 1.0
          },
        minzoom: 10,
      });

      this.map.on('click', 'intersections', (e) => {
        this.showIntersectionDetail(e.features[0].properties.id)
      });


    } else if(this.map.getLayer("intersections")) {
      this.map.getSource("intersection-data").setData(intersectionFeatures);
    }

  }

  generateIntersectionFeatures() {
    var keyedData = this.keyedData;
    var intersections = {"type" : "FeatureCollection", "features": []};

    for(var itemId in keyedData) {
      if(keyedData[itemId].type == "intersection") {
          var feature = {"type": "Feature","properties": {"id": itemId},"geometry": {"type": "Point","coordinates": [keyedData[itemId].data.lon,keyedData[itemId].data.lat]}};
          intersections.features.push(feature);
      }
    }

    return intersections;

  }

  showIntersectionDetail(intersectionId) {

    var intersectionDetailData = {"type" : "FeatureCollection", "features": []};

    if(!this.map.getLayer("intersection-detail-outbound-arrow")) {

      this.map.addSource("intersection-detail-data", {
         "type": "geojson",
         "data": intersectionDetailData
      });

      this.map.addLayer({
        "id": "intersection-detail-outbound-arrow",
        "type": "fill",
        "source": "intersection-detail-data",
        "paint": {
              'fill-color':"#cc9999",
              'fill-opacity': 0.75,
          },
        "filter": ["==", "type", "outbound-arrow"],
        minzoom: 15,
      });

      this.map.addLayer({
        "id": "intersection-detail-inbound-arrow",
        "type": "fill",
        "source": "intersection-detail-data",
        "paint": {
              'fill-color':"#9999cc",
              'fill-opacity': 0.75
              //'circle-opacity': 1.0
              // 'line-color':"#9999cc",
              // 'line-opacity': 1.0,
              // 'line-width' : 2.0,
              // 'line-dasharray' : [1.0,0.5]
          },
        "filter": ["==", "type", "inbound-arrow"],
        minzoom: 15,
      });


      this.map.addLayer({
        "id": "intersection-detail-inbound-line",
        "type": "line",
        "source": "intersection-detail-data",
        "paint": {
              'line-color':"#9999cc",
              'line-opacity': 0.75,
              'line-width' : 2.0,
              'line-dasharray' : [1.0,0.5]
          },
        "filter": ["==", "type", "inbound-line"],
        minzoom: 12,
      });

      this.map.addLayer({
        "id": "intersection-detail-outbound-line",
        "type": "line",
        "source": "intersection-detail-data",
        "paint": {
              'line-color':"#cc9999",
              'line-opacity': 0.75,
              'line-width' : 2.0,
              'line-dasharray' : [1.0,0.5]
          },
        "filter": ["==", "type", "outbound-line"],
        minzoom: 12,
      });

      this.map.addLayer({
        "id": "geometry",
        "type": "line",
        "source": "intersection-detail-data",
        "paint": {
              'line-color':"#cccccc",
              'line-opacity': 0.75,
              'line-width' : 4.0,
              'line-dasharray' : [1.0,0.5]
          },
        "filter": ["==", "type", "geometry"],
        minzoom: 12,
      });
    }

    var intersectionDetailData = this.generateIntersectionDetail(intersectionId);
    this.map.getSource('intersection-detail-data').setData(intersectionDetailData)

  }

  generateIntersectionDetail(intersectionId) {

    var keyedData = this.keyedData;
    var showInbound = true;
    var ids = []
    if(!intersectionId) {
      // only show outbound for complete map
      showInbound = false;
      for(var id in keyedData) {
        if(keyedData[id].type == "intersection")
          ids.push(intersectionId);
      }
    }
    else {
      ids.push(intersectionId);
    }

    var  features = [];

    var  geometryIds = {};

    ids.forEach(intersectionId => {
      if(keyedData[intersectionId].outbound) {
        keyedData[intersectionId].outbound.forEach(outboundId => {
            var subFeatures = this.generateReferenceGeometries(outboundId, "outbound");
            geometryIds[keyedData[outboundId].data.geometryId] = true;
            if(subFeatures && subFeatures.length > 0) {
              Array.prototype.push.apply(features, subFeatures);
            }



        });
      }

      if( showInbound && keyedData[intersectionId].inbound) {
        keyedData[intersectionId].inbound.forEach(inboundId => {
            var subFeatures =  this.generateReferenceGeometries(inboundId, "inbound");
            geometryIds[keyedData[inboundId].data.geometryId] = true;
            if(subFeatures && subFeatures.length > 0)
              Array.prototype.push.apply(features, subFeatures);
        });
      }
    });

    Object.keys(geometryIds).forEach(geometryId => {
      if(keyedData[geometryId]) {
        keyedData[geometryId].data.properties['type'] = "geometry"
        features.push(keyedData[geometryId].data);
      }
    });

    var intersectionFeatureCollection = helpers.featureCollection(features);
    return intersectionFeatureCollection;
  }

  generateReferenceGeometries(referenceId, direction) {

    var keyedData = this.keyedData;

    var reference = keyedData[referenceId].data;

    var lineCoordinates = [];
    reference.locationReferences.forEach(locationReference => {
      lineCoordinates.push([locationReference.lon, locationReference.lat]);
    });

    try {

      // draw dashed/offset reference line
      var line = helpers.lineString(lineCoordinates);
      var offsetLine = lineOffset(line, 1, "meters");

      var features = []

      // only draw arrows for lines over 20m
      if(reference.locationReferences[0].distanceToNextRef > 20) {
        // draw triangle showing bearing point direction
        // calc bearing as -180 to 180 degrees
        var bearing = reference.locationReferences[0].outboundBearing > 180 ? reference.locationReferences[0].outboundBearing - 360 : reference.locationReferences[0].outboundBearing;

        // find bearing point (20 meters out at bearing)
        var bearingPoint1 = destination(helpers.point([reference.locationReferences[0].lon, reference.locationReferences[0].lat]), 0.01, bearing, "kilometers");

        // offset bearing point line to align with dashed refernce line
        var bearingPointLine = helpers.lineString([[reference.locationReferences[0].lon, reference.locationReferences[0].lat], bearingPoint1.geometry.coordinates]);
        var offsetBearingPointLine = lineOffset(bearingPointLine, 1, "meters");

        // offset far point of triangle bases
        var bearingPoint2 = destination(helpers.point([reference.locationReferences[0].lon, reference.locationReferences[0].lat]), 0.002, bearing + 90, "kilometers");

        // build arrow from points
        var arrowCoords  = [[offsetBearingPointLine.geometry.coordinates[1], bearingPoint2.geometry.coordinates, [reference.locationReferences[0].lon, reference.locationReferences[0].lat], offsetBearingPointLine.geometry.coordinates[1]]];
        var inboundBearingArrow = helpers.polygon(arrowCoords);



        features.push(helpers.feature(inboundBearingArrow.geometry, {"id" : referenceId, "type": "outbound-arrow"}));

        // draw triangle showing bearing point direction
        // calc bearing as -180 to 180 degrees
        bearing = reference.locationReferences[1].inboundBearing > 0 ? reference.locationReferences[1].inboundBearing - 180 : reference.locationReferences[1].inboundBearing + 180;

        // find bearing point (20 meters out at bearing)
        bearingPoint1 = destination(helpers.point([reference.locationReferences[1].lon, reference.locationReferences[1].lat]), 0.01, bearing, "kilometers");

        // offset bearing point line to align with dashed refernce line
        bearingPointLine = helpers.lineString([bearingPoint1.geometry.coordinates, [reference.locationReferences[1].lon, reference.locationReferences[1].lat]]);
        offsetBearingPointLine = lineOffset(bearingPointLine, 1, "meters");

        // offset far point of triangle bases
        bearingPoint2 = destination(helpers.point(bearingPoint1.geometry.coordinates), 0.002, bearing - 90, "kilometers");

        // build arrow from points
        arrowCoords  = [[bearingPoint1.geometry.coordinates, offsetBearingPointLine.geometry.coordinates[1], bearingPoint2.geometry.coordinates, bearingPoint1.geometry.coordinates]];
        var outboundBearingArrow = helpers.polygon(arrowCoords);

        features.push(helpers.feature(outboundBearingArrow.geometry, {"id" : referenceId, "type": "inbound-arrow"}));
      }

      features.push(helpers.feature(offsetLine.geometry, {"id" : referenceId, "type": direction + "-line"}));

      return features;
    }
    catch (exception){
      return null;
    }
  }

  addReference(reference) {

    var keyedData = this.keyedData;

    keyedData[reference.id] = {};

    keyedData[reference.id].type = "reference";
    keyedData[reference.id].data = reference;

    var outboundIntersecionId = reference.locationReferences[0].intersectionId;
    var inboundIntersecionId = reference.locationReferences[reference.locationReferences.length - 1].intersectionId;

    if(keyedData[outboundIntersecionId] == undefined) {
      keyedData[outboundIntersecionId] = {};
      keyedData[outboundIntersecionId].type = "intersection";
      keyedData[outboundIntersecionId].data = {};
      keyedData[outboundIntersecionId].data.lat = reference.locationReferences[0].lat;
      keyedData[outboundIntersecionId].data.lon = reference.locationReferences[0].lon;
    }


    if(keyedData[outboundIntersecionId].outbound == undefined)
      keyedData[outboundIntersecionId].outbound = [];

    keyedData[outboundIntersecionId].outbound.push(reference.id);

    if(keyedData[inboundIntersecionId] == undefined) {
      keyedData[inboundIntersecionId] = {};
      keyedData[inboundIntersecionId].type = "intersection";
      keyedData[inboundIntersecionId].data = {};
      keyedData[inboundIntersecionId].data.lat = reference.locationReferences[reference.locationReferences.length - 1].lat;
      keyedData[inboundIntersecionId].data.lon = reference.locationReferences[reference.locationReferences.length - 1].lon;
    }


    if(keyedData[inboundIntersecionId].inbound == undefined)
      keyedData[inboundIntersecionId].inbound = [];

    keyedData[inboundIntersecionId].inbound.push(reference.id);
  }

  addTile(tileId) {

      if(this.loadedTiles == undefined)
        this.loadedTiles = []

      // bail if tile already loaded
      if(this.loadedTiles[tileId])
        return;

      this.loadedTiles[tileId] = true;

      if(this.keyedData == undefined)
        this.keyedData = [];


      var referenceRequest = new XMLHttpRequest();
      referenceRequest.open("GET", './data/tiles/' + tileId + '.reference.pbf', true);
      referenceRequest.responseType = "arraybuffer";

      referenceRequest.onload = (oEvent) =>  {
        if(referenceRequest.response.byteLength > 2000) { // hack for development env because react bootstrap code doesn't return 404s
          var reader = protobuf.Reader.create(new Uint8Array(referenceRequest.response));
          while (reader.pos < reader.len) {
            var reference = this.SharedStreetsReference.decodeDelimited(reader);
            this.addReference(reference);
          }
          this.showIntersectionLayer();
        }
      };

      referenceRequest.send();

      // request().responseType('blob').get( (error, response) => {
      //   if (!error) {
      //
      //     var arrayBuffer = response.response;
      //     var data = new Uint8Array(arrayBuffer);
      //     var reader = new protobuf.Reader(data);
      //     while (reader.pos < reader.len) {
      //
      //         var item = this.SharedStreetsReference.decodeDelimited(reader);
      //     }
      //
      //     this.showIntersectionDetail();
      //   }
      // });

    //   request('./data/tiles/' + tileId + '.intersection.pbf').responseType('blob').get(  (error, response) => {
    //     if (!error) {
    //
    //       var data = new Uint8Array(response);
    //
    //         // this.mapIntersectionData = response;
    //         //
    //         // response.features.forEach((item) => {
    //         //
    //         //   if(keyedData[item.properties.id] == undefined)
    //         //     keyedData[item.properties.id] = {};
    //         //
    //         //   keyedData[item.properties.id].intersection = item;
    //         //
    //         // });
    //
    // });
  }
  componentDidMount() {
    const { lng, lat, zoom, data, mapType } = this.state;
    var z = 11;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/transportpartnership/cj8wntx6cgad82rugw1b1xz0d',
      center: [lng, lat],
      zoom
    });


    var map = this.map;

    protobuf.load("sharedstreets.proto", (err, root) => {
        if (err)
            throw err;

        // Obtain a message type
        this.SharedStreetsReference = root.lookupType("io.sharedstreets.SharedStreetsReference");
        this.SharedStreetsIntersection = root.lookupType("io.sharedstreets.SharedStreetsIntersection");
        this.SharedStreetsGeometry = root.lookupType("io.sharedstreets.SharedStreetsGeometry");
    });

    map.on('moveend', () => {
      if(map.getZoom() > 11) {
        var mapboxBounds = map.getBounds();
        var bounds = [mapboxBounds.getWest(), mapboxBounds.getSouth(), mapboxBounds.getEast(), mapboxBounds.getNorth()]
        var tiles = sphericalMercator.xyz(bounds, z);
        for(var x = tiles.minX; x <= tiles.maxX; x++){
          for(var y = tiles.minY; y <= tiles.maxY; y++){
              var tileId = z + '-' + x + '-' + y;
              this.addTile(tileId);
          }
        }
      }
    });

    map.on('style.load', () => {
      this.mapLoaded = true;
      if(map.getZoom() > 11) {
        var mapboxBounds = map.getBounds();
        var bounds = [mapboxBounds.getWest(), mapboxBounds.getSouth(), mapboxBounds.getEast(), mapboxBounds.getNorth()]
        var tiles = sphericalMercator.xyz(bounds, z);
        for(var x = tiles.minX; x <= tiles.maxX; x++){
          for(var y = tiles.minY; y <= tiles.maxY; y++){
              var tileId = z + '-' + x + '-' + y;
              this.addTile(tileId);
          }
        }
      }
    });

    map.on('load', () => {
        this.mapLoaded = true;

     });
  }


  render() {
    const { lng, lat, zoom } = this.state;
    const { filter } = this.props;

    if(this.map) {
      if(this.useMap != filter.useMap) {
        this.useMap = filter.useMap;
        if(this.useMap == false) {
          this.map.setStyle('mapbox://styles/transportpartnership/cj8wm5xa0g8ql2smvduavi5gr');

        } else {
          this.map.setStyle('mapbox://styles/transportpartnership/cj8wntx6cgad82rugw1b1xz0d');

        }
      }

    }


    return (
        <div ref={el => this.mapContainer = el} style={{height:'100vh', width: '100vw'}}/>
    );
  }
}
