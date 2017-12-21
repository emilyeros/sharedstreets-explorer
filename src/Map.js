import React from 'react'
import ReactDOM from 'react-dom'
import {json as requestJson} from 'd3-request';
import { map as _map} from 'underscore';
import { filter as _filter} from 'underscore';
import { first as _first} from 'underscore';
import { last as _last} from 'underscore';
import helpers from "@turf/helpers";
import lineOffset from "@turf/line-offset";
import destination from "@turf/destination"

window.mapboxgl.accessToken = 'pk.eyJ1IjoidHJhbnNwb3J0cGFydG5lcnNoaXAiLCJhIjoiY2oyZ2R1aTk2MDdteDMyb2dibXpuMjdweiJ9.RtukedapVNqEAsYU-f1Vaw';

export default class Map extends React.Component {

  constructor(props: Props) {
    super(props);

    this.state = {
      lng: -74.006344,
      lat:  40.630785,
      zoom: 14.0
    };
  }

  componentDidMount() {
    const { lng, lat, zoom, data, mapType } = this.state;

    this.map = new window.mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/transportpartnership/cj8wntx6cgad82rugw1b1xz0d',
      center: [lng, lat],
      zoom
    });
    var map = this.map;
    window.map = map;  // For easy access from inspector, etc.

    // TODO(deanm): Maybe should move to universal SSR/SSI/SSG naming.
    const kSSRFilter = ["==", "type", "reference"];
    const kSSIFilter = ["==", "type", "intersection"];
    const kSSGFilter = ["==", "type", "geometry"];

    map.on('style.load', () => {
      this.mapLoaded = true;

      // NOTE(deanm): There is some stupid race here (which I think is mapbox-gl's fault),
      // I feel like we should be able to do this just after creating the map, but it seems
      // like the message doesn't make it to the workers then (I guess maybe they aren't
      // created a listening to messages yet?).  Doing it here seems to work : \
      window.TiledGeoJSON.registerSource(map);

      this.map.addSource("streets-data", {
         "type": "tiled-geojson",
         "tiles": [
           //document.location.origin + "/data/nyc_tiles_combined/{z}-{x}-{y}.json"
           document.location.origin + "/data/nyc_full/"
         ]
      });

      // Lines from the geometries
      map.addLayer({
        'id': 'blah',
        'type': 'line',
        'source': 'streets-data',
        "filter": kSSGFilter,
        'layout': {},
        'paint': {
          'line-color': '#f08',
        },
        "paint": {
              'line-color':"#9999cc",
              'line-opacity': 0.75,
              'line-width' : 2.0,
              'line-dasharray' : [1.0,0.5]
          },
      });

      map.addLayer({
        'id': 'blah2',
        'type': 'circle',
        'source': 'streets-data',
        "filter": kSSIFilter,
        'layout': {},
        "paint": {
          // make circles larger as the user zooms from z12 to z22
          'circle-radius': {
            'base': 1.0,
            'stops': [[12, 1], [14, 4]]
          },
          'circle-color':"#9999cc",
          'circle-opacity': 1.0
          },
      });

/*
      map.addLayer({
        'id': 'blah3',
        'type': 'symbol',
        'source': 'streets-data',
        "filter": kSSIFilter,
        'layout': {
          'icon-image': 'drinking-water-11',
        }
      });
*/

      if (0)
      map.addLayer({
        'id': 'blah3',
        'type': 'symbol',
        'source': 'streets-data',
        "filter": kSSRFilter,
        'layout': {
          'visibility': 'none',
          'icon-image': 'triangle-11',
          'icon-allow-overlap': true,
          'icon-ignore-placement': true,
          'icon-offset': [0, -8],
          /*
          'icon-offset': { stops: [
            [5, [0, -1]],
            [10, [0, -8]],
          ]},
          */
          'icon-rotate': {
            'type': 'identity',
            'property': 'outboundBearing'
          }
        }
      });

      // Lines from the SSRs (not geometry)
      if (1)
      map.addLayer({
        'id': 'blah4',
        'type': 'line',
        'source': 'streets-data',
        "filter": ["==", "type", "reference"],
        'layout': {},
        'paint': {
          'line-color': '#f08',
        }
      });

    });


    map.on('click', e => {
      const kWH = 5;
      var querybox = [[e.point.x - kWH, e.point.y - kWH], [e.point.x + kWH, e.point.y + kWH]];
      var res = map.queryRenderedFeatures(querybox, {layers: ['blah2']});
      if (!res || res.length !== 1) {
        // Unfortunately map.getFilter() !== map.getFilter(), apparently
        // a new array is constructed and returned for each call.
        // NOTE(deanm): Seems it shouldn't be costly to do this even when the
        // filter doesn't change, setFilter internally checks for that.
        //map.setFilter('blah3', kSSRFilter);  // Reset to the default filter.
        map.setLayoutProperty('blah3', 'visibility', 'none');
        return;
      }
      // Set up a filter for the selection.
      var sid = res[0].properties.sid;
      map.setFilter('blah3', ['all', kSSRFilter, ['any', ["==", "outboundIntersectionId", sid], ["==", "inboundIntersectionId", sid]]]);
        map.setLayoutProperty('blah3', 'visibility', 'visible');
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
