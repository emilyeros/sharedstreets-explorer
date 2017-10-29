import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import {json as requestJson} from 'd3-request';
import { map as _map} from 'underscore';
import { filter as _filter} from 'underscore';
import { first as _first} from 'underscore';
import { last as _last} from 'underscore';
import helpers from "@turf/helpers";
import lineOffset from "@turf/line-offset";
import destination from "@turf/destination"

mapboxgl.accessToken = 'pk.eyJ1IjoidHJhbnNwb3J0cGFydG5lcnNoaXAiLCJhIjoiY2oyZ2R1aTk2MDdteDMyb2dibXpuMjdweiJ9.RtukedapVNqEAsYU-f1Vaw';

export default class Map extends React.Component {

  constructor(props: Props) {
    super(props);

    this.state = {
      lng: -74.006344,
      lat:  40.630785,
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
        minzoom: 12,
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
        minzoom: 12,
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

    var  features = []

    ids.forEach(intersectionId => {



      if(keyedData[intersectionId].outbound) {
        keyedData[intersectionId].outbound.forEach(outboundId => {
            var subFeatures = this.generateReferenceGeometries(outboundId, "outbound");

            if(subFeatures && subFeatures.length > 0)
              Array.prototype.push.apply(features, subFeatures);


        });
      }

      if( showInbound && keyedData[intersectionId].inbound) {
        keyedData[intersectionId].inbound.forEach(inboundId => {
            var subFeatures =  this.generateReferenceGeometries(inboundId, "inbound");
            if(subFeatures && subFeatures.length > 0)
              Array.prototype.push.apply(features, subFeatures);
        });
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
      var offsetLine = lineOffset(line, 2, "meters");

      // draw triangle showing bearing point direction
      // calc bearing as -180 to 180 degrees
      var bearing = reference.locationReferences[0].bearing > 180 ? reference.locationReferences[0].bearing - 360 : reference.locationReferences[0].bearing;

      // find bearing point (20 meters out at bearing)
      var bearingPoint1 = destination(helpers.point(reference.locationReferences[0].point), 0.02, bearing, "kilometers");

      // offset bearing point line to align with dashed refernce line
      var bearingPointLine = helpers.lineString([reference.locationReferences[0].point, bearingPoint1.geometry.coordinates]);
      var offsetBearingPointLine = lineOffset(bearingPointLine, 2, "meters");

      // offset far point of triangle bases
      var bearingPoint2 = destination(helpers.point(reference.locationReferences[0].point), 0.004, bearing + 90, "kilometers");

      // build arrow from points
      var arrowCoords  = [[offsetBearingPointLine.geometry.coordinates[1], bearingPoint2.geometry.coordinates, reference.locationReferences[0].point, offsetBearingPointLine.geometry.coordinates[1]]];
      var bearingArrow = helpers.polygon(arrowCoords);

      var features = []

      features.push(helpers.feature(bearingArrow.geometry, {"id" : referenceId, "type": direction + "-arrow"}));
      features.push(helpers.feature(offsetLine.geometry, {"id" : referenceId, "type": direction + "-line"}));

      return features;
    }
    catch (exception){
      return null;
    }
  }

  addTile(tileId) {

    if(this.keyedData == undefined)
      this.keyedData = [];

    var keyedData = this.keyedData;

    if(this.tilesLoaded == undefined)
      this.tilesLoaded = {};

    if(!this.tilesLoaded[tileId]) {

      this.tilesLoaded[tileId] = true;

      requestJson('./data/nyc_core/reference/' + tileId + '.reference.json', (error, response) => {
        if (!error) {
            response.forEach((item) => {

              keyedData[item.id] = {};

              keyedData[item.id].type = "reference"
              keyedData[item.id].data = item;

              var outboundIntersecionId = item.locationReferences[0].intersectionId;
              var inboundIntersecionId = item.locationReferences[item.locationReferences.length - 1].intersectionId;

              if(outboundIntersecionId == '9dVpcxMxmtoBXBgHmLDTXj') {
                console.log('9dVpcxMxmtoBXBgHmLDTXj');
              }

              if(inboundIntersecionId == '9dVpcxMxmtoBXBgHmLDTXj') {
                console.log('9dVpcxMxmtoBXBgHmLDTXj');
              }

              if(keyedData[outboundIntersecionId] == undefined)
                keyedData[outboundIntersecionId] = {};

              if(keyedData[outboundIntersecionId].outbound == undefined)
                keyedData[outboundIntersecionId].outbound = [];

              keyedData[outboundIntersecionId].outbound.push(item.id);

              if(keyedData[inboundIntersecionId] == undefined)
                keyedData[inboundIntersecionId] = {};

              if(keyedData[inboundIntersecionId].inbound == undefined)
                keyedData[inboundIntersecionId].inbound = [];

              keyedData[inboundIntersecionId].inbound.push(item.id);

            });

            this.showIntersectionDetail();
        }
      });

      requestJson('./data/nyc_core/intersection/' + tileId + '.intersection.json', (error, response) => {
        if (!error) {

            this.mapIntersectionData = response;

            response.features.forEach((item) => {

              if(item.properties.id == '9dVpcxMxmtoBXBgHmLDTXj') {
                console.log('9dVpcxMxmtoBXBgHmLDTXj');
              }


              if(keyedData[item.properties.id] == undefined)
                keyedData[item.properties.id] = {};

              keyedData[item.properties.id].intersection = item;

            });

            this.showIntersectionLayer();
        }
      });
    }
  }


  componentDidMount() {
    const { lng, lat, zoom, data, mapType } = this.state;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/transportpartnership/cj8wntx6cgad82rugw1b1xz0d',
      center: [lng, lat],
      zoom
    });
    var map = this.map;


    map.on('style.load', () => {
      this.mapLoaded = true;

      var tileId = '10-301-385';

      this.addTile(tileId);

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
