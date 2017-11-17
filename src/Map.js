import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import {json as requestJson} from 'd3-request';
import { map as _map} from 'underscore';
import { filter as _filter} from 'underscore';
import { first as _first} from 'underscore';
import { last as _last} from 'underscore';
import { Reader, load as protoLoad }  from "protobufjs";
import helpers from "@turf/helpers";
import lineOffset from "@turf/line-offset";
import destination from "@turf/destination"

mapboxgl.accessToken = 'pk.eyJ1IjoidHJhbnNwb3J0cGFydG5lcnNoaXAiLCJhIjoiY2oyZ2R1aTk2MDdteDMyb2dibXpuMjdweiJ9.RtukedapVNqEAsYU-f1Vaw';

export default class Map extends React.Component {

  constructor(props: Props) {
    super(props);

    this.state = {
      lng: -122.4132,
      lat:  37.7753,
      zoom: 14.0
    };
  }

  showIntersectionLayer() {
    var map = this.map;

    if(!this.map.getLayer("intersections") && this.mapLoaded ) {

      var intersectionFeatures = [];

      this.map.addLayer({
        "id": "intersections",
        "type": "circle",
        "source": {
            "type": "geojson",
            "data": this.mapIntersectionData
        },
        "paint": {
              // make circles larger as the user zooms from z12 to z22
              'circle-radius': {
                  'base': 1.0,
                  'stops': [[12, 1], [22, 15]]
              },
              // color circles by ethnicity, using data-driven styles
              'circle-color':"#9999cc",
              'circle-opacity': 1.0
          },
        minzoom: 12,
      });

      var keyedData = this.keyedData;

      this.map.on('click', 'intersections', (e) => {
        this.showIntersectionDetail(e.features[0].properties.id)
      });


    } else if(this.map.getLayer("intersections")) {

    }

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


  generateIntersectionDetail(id) {

    var keyedData = this.keyedData;
    var showInbound = true;
    var ids = []
    if(!id) {
      for(var intersectionId in keyedData) {
        ids.push(intersectionId);
        // only show outbound for complete map
        showInbound = false;
      }
    }
    else {
      ids.push(id);
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
      lineCoordinates.push(locationReference.point);
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
        var bearingPoint1 = destination(helpers.point(reference.locationReferences[0].point), 0.01, bearing, "kilometers");

        // offset bearing point line to align with dashed refernce line
        var bearingPointLine = helpers.lineString([reference.locationReferences[0].point, bearingPoint1.geometry.coordinates]);
        var offsetBearingPointLine = lineOffset(bearingPointLine, 1, "meters");

        // offset far point of triangle bases
        var bearingPoint2 = destination(helpers.point(reference.locationReferences[0].point), 0.002, bearing + 90, "kilometers");

        // build arrow from points
        var arrowCoords  = [[offsetBearingPointLine.geometry.coordinates[1], bearingPoint2.geometry.coordinates, reference.locationReferences[0].point, offsetBearingPointLine.geometry.coordinates[1]]];
        var inboundBearingArrow = helpers.polygon(arrowCoords);



        features.push(helpers.feature(inboundBearingArrow.geometry, {"id" : referenceId, "type": "outbound-arrow"}));

        // draw triangle showing bearing point direction
        // calc bearing as -180 to 180 degrees
        bearing = reference.locationReferences[1].inboundBearing > 0 ? reference.locationReferences[1].inboundBearing - 180 : reference.locationReferences[1].inboundBearing + 180;

        // find bearing point (20 meters out at bearing)
        bearingPoint1 = destination(helpers.point(reference.locationReferences[1].point), 0.01, bearing, "kilometers");

        // offset bearing point line to align with dashed refernce line
        bearingPointLine = helpers.lineString([bearingPoint1.geometry.coordinates, reference.locationReferences[1].point]);
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

  addTile(tileSource, tileId) {

    if(this.keyedData == undefined)
      this.keyedData = [];

    var keyedData = this.keyedData;

    if(this.tilesLoaded == undefined)
      this.tilesLoaded = {};

    if(!this.tilesLoaded[tileId]) {

      this.tilesLoaded[tileId] = true;


    }
  }


  componentDidMount() {
    const { lng, lat, zoom, data, mapType } = this.state;

    this.protos = {};
    var protos = this.protos;

    protoLoad('sharedstreets.proto', (err, root) => {
      protos.SharedStreetsReference = root.lookupType("SharedStreetsReference");
      protos.SharedStreetsGeometry = root.lookupType("SharedStreetsGeometry");


      var oReq = new XMLHttpRequest();
      oReq.open("GET", "data/test3/11-602-770.reference.pbf", true);
      oReq.responseType = "arraybuffer";

      oReq.onload = (oEvent) =>  {
        var msg = protos.SharedStreetsReference.decodeDelimited(new Uint8Array(oReq.response));
        console.log(msg);
      };

      oReq.send();
    });

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/transportpartnership/cj8wntx6cgad82rugw1b1xz0d',
      center: [lng, lat],
      zoom
    });


    var map = this.map;


    map.on('style.load', () => {
      this.mapLoaded = true;

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
