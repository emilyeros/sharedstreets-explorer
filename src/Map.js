import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import {json as requestJson} from 'd3-request';
import { map as _map} from 'underscore';
import { filter as _filter} from 'underscore';
import { first as _first} from 'underscore';
import { last as _last} from 'underscore';

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
                  'stops': [[12, 1], [22, 20]]
              },
              // color circles by ethnicity, using data-driven styles
              'circle-color':"#ccccff",
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

    if(!this.map.getLayer("intersection-detail")) {

      this.map.addSource("intersection-detail-data", {
         "type": "geojson",
         "data": intersectionDetailData
      });

      this.map.addLayer({
        "id": "intersection-detail",
        "type": "line",
        "source": "intersection-detail-data",
        "paint": {

              // color circles by ethnicity, using data-driven styles
              'line-color':"#ccccff",
              'line-opacity': 1.0,
              'line-width' : 5.0,
              'line-dasharray' : [2,2]
          },
        minzoom: 12,
      });
    }

    var keyedData = this.keyedData;

    if(keyedData[intersectionId].outbound) {
      keyedData[intersectionId].outbound.forEach(outboundId => {
          intersectionDetailData.features.push(this.generateReferenceGeometry(outboundId));
      });
    }

    this.map.getSource('intersection-detail-data').setData(intersectionDetailData)

  }

  generateReferenceGeometry(referenceId) {

    var intersectionDetailData = {"type" : "Feature", "properties": {}, "geometry":{ "type": "GeometryCollection","geometries": []}};
    var keyedData = this.keyedData;

    var reference = keyedData[referenceId].data;

    var locationReferenceLine = {"type" : "LineString", "coordinates": []};
    reference.locationReferences.forEach(locationReference => {
      locationReferenceLine.coordinates.push(locationReference.point);
    });

    intersectionDetailData.geometry.geometries.push(locationReferenceLine);
    return intersectionDetailData;

  }
s
  addTile(tileId) {

    if(this.keyedData == undefined)
      this.keyedData = [];

    var keyedData = this.keyedData;

    if(this.tilesLoaded == undefined)
      this.tilesLoaded = {};

    if(!this.tilesLoaded[tileId]) {

      this.tilesLoaded[tileId] = true;

      requestJson('./data/nyc_test_tiles/reference/' + tileId + '.reference.geojson', (error, response) => {
        if (!error) {
            response.forEach((item) => {

              keyedData[item.id] = {};

              keyedData[item.id].type = "reference"
              keyedData[item.id].data = item;

              var outboundIntersecionId = item.locationReferences[0].intersectionId;
              var inboundIntersecionId = item.locationReferences[item.locationReferences.length - 1].intersectionId;

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
        }
      });

      requestJson('./data/nyc_test_tiles/intersection/' + tileId + '.intersection.geojson', (error, response) => {
        if (!error) {

            this.mapIntersectionData = response;

            response.features.forEach((item) => {

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
