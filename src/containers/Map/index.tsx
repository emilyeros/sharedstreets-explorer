

import * as React from 'react';
import * as style from './style.css';

import * as mapboxgl from 'mapbox-gl';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {MAP_STREET_LIGHT, MAP_SATELLITE} from './constants'
import { MapState, Layer } from './reducers';
import { moveMapLatLngAction, setLayerVisibiltiyAction, MoveMapLatLngAction, registerLayerAction, selectSegmentsAction } from './actions';

import { MapLayer } from '../../layers/mapLayer';
import SharedStreetsLayer from '../../layers/sharedStreetsLayer';

import CurbLayer from '../../layers/curbLayer';

// typescript workaround: https://stackoverflow.com/questions/44332290/mapbox-gl-typing-wont-allow-accesstoken-assignment#answer-44393954
Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set('pk.eyJ1IjoidHJhbnNwb3J0cGFydG5lcnNoaXAiLCJhIjoiY2oyZ2R1aTk2MDdteDMyb2dibXpuMjdweiJ9.RtukedapVNqEAsYU-f1Vaw');

namespace Map {

  export interface Props {
    initialState?:{lat:number,lon:number,zoom:number},
    mapState?:MapState,
    onMapMove?,
    registerLayer?,
    selectSegmentsAction?
  }

  export interface State {
  
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class Map extends React.Component<Map.Props, Map.State>  {

  map:mapboxgl.Map;
  //layers:{};

  constructor(props?: Map.Props, context?: any) {
    super(props, context);
    //his.layers = {};
  }

  componentDidMount() {
      var {lat, lon, zoom} = this.props.initialState;

      this.map = new mapboxgl.Map({ 
        container: 'map', 
        style: 'mapbox://styles/transportpartnership/cj8wntx6cgad82rugw1b1xz0d', 
        center: [lon, lat],
        zoom: zoom });

      this.map.on('load', () => {

        this.map.resize();
        this.addLayer(true);

        this.map.on('moveend', (evt) => {
          if (!evt.originalEvent)
            return;
          let center:mapboxgl.LngLat = this.map.getCenter();
          this.props.onMapMove(center.lat, center.lng,this.map.getZoom(), this.map.getBounds());
        });

      });

      this.map.on('style.load', (evt) => {
        this.buildLayers();
      });
  }

  addLayer(buildLayers:boolean) {
    
    var ssLayer:MapLayer<Layer.Props, Layer.State> = new SharedStreetsLayer(this.props, this.context);
    ssLayer.visible = true;
    this.props.registerLayer(ssLayer);
    
    const curbLayer:MapLayer<Layer.Props, Layer.State> = new CurbLayer(this.props, this.context);
    this.props.registerLayer(curbLayer);

  
    if(buildLayers)
      this.buildLayers();
     
  }

  buildLayers() {
    
    for(var layerId in this.props.mapState.mapLayers){ 
      this.props.mapState.mapLayers[layerId].registerLayer(this.map);
    }
  }

  componentWillReceiveProps(nextProps:Map.Props){
    const { lat, lon, zoom, mapType, mapLayers } = this.props.mapState;
    const { } = this.state;
  
    if(this.map) {

      if(mapType != nextProps.mapState.mapType) {
        if(nextProps.mapState.mapType === MAP_STREET_LIGHT)
          this.map.setStyle('mapbox://styles/transportpartnership/cj8wntx6cgad82rugw1b1xz0d');
        else if(nextProps.mapState.mapType === MAP_SATELLITE)
          this.map.setStyle('mapbox://styles/transportpartnership/cj8wm5xa0g8ql2smvduavi5gr');
      }

      for(var layerId of Object.keys(mapLayers)){
        if(mapLayers[layerId].visible != nextProps.mapState.mapLayers[layerId].visible)
          mapLayers[layerId].showLayer(nextProps.mapState.mapLayers[layerId].visible);
      }

    
      if(zoom != nextProps.mapState.zoom) {
        this.map.setZoom(nextProps.mapState.zoom);
      }

      if(lat != nextProps.mapState.lat || lon != nextProps.mapState.lon) {
        let center = new mapboxgl.LngLat(nextProps.mapState.lon, nextProps.mapState.lat);
        this.map.setCenter(center);
      }

    }
  }

  render() {
    return (
        <div className={style.map} id='map'>
        </div>
    );
  }
}

function mapStateToProps(state: MapState) {
  return {
    mapState: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMapMove: bindActionCreators(moveMapLatLngAction, dispatch),
    registerLayer: bindActionCreators(registerLayerAction, dispatch),
    selectSegmentsAction: bindActionCreators(selectSegmentsAction, dispatch)
  };
}

