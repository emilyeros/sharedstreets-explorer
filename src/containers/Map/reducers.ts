import { handleActions } from 'redux-actions';
import {MAP_STREET_LIGHT} from '../../containers/Map/constants'
import  {MapActionTypeKeys, MapActionTypes, SetMapTypeAction} from './actions'
import { ReactChildren } from 'react';
import {MapLayer} from '../../layers/mapLayer'
import { Map } from 'mapbox-gl/dist/mapbox-gl';

import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

interface Dictionary<T> {
  [Key: string]: T;
}


export namespace Layer {
  export interface Props {
    selectSegmentsAction?
  }
  export interface State {

  }
}

export interface MapState {
  mapType:MapType;
  lat?:number;
  lon?:number;
  zoom?:number;
  mapLayers?:Dictionary<MapLayer<Layer.Props, Layer.State>>;
  bounds?:mapboxgl.LngLatBounds;
  selectedSegments?:string[];
}

export const initialState: MapState = {
  mapType:MAP_STREET_LIGHT,
  mapLayers:{}
}; 

export function mapReducer(s: MapState, action: MapActionTypes) {
  switch (action.type) {
    case MapActionTypeKeys.REGISTER_LAYER:
      s.mapLayers[action.layer.LAYER_ID] = action.layer;
      return{...s};
    case MapActionTypeKeys.SET_MAP_TYPE:
      return {...s, mapType: action.mapType};
    case MapActionTypeKeys.SELECT_SEGMENTS:
      return {...s, selectedSegments: action.segments};
    case MapActionTypeKeys.MOVE_MAP_LATLNG:
      var latRound:number = Math.round(action.lat * 100000) / 100000;
      var lonRound:number = Math.round(action.lon * 100000) / 100000;
      var zoomRound:number = Math.round(action.zoom * 1000) / 1000;
      history.replace('/' + latRound + '/' +  lonRound + '/' + zoomRound + '/');
      return {...s, lat: action.lat, lon: action.lon, zoom: action.zoom, bounds: action.bounds };
    case MapActionTypeKeys.MOVE_MAP_BBOX:
      let lon = (action.bbox[0] + action.bbox[2]) / 2;
      let lat = (action.bbox[1] + action.bbox[3]) / 2;
      return {...s, lat: lat, lon:lon, zoom: 10 };
    case MapActionTypeKeys.SET_LAYER_VISIBILITY:
        s.mapLayers[action.layerId].visible = action.visible;
        return {...s};
    default:
      return s;
  }
}
