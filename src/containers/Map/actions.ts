import {MapLayer} from '../../layers/mapLayer';
import {Layer} from './reducers';

export enum MapActionTypeKeys {
    SET_MAP_TYPE = "SET_MAP_TYPE",
    MOVE_MAP_LATLNG = "MOVE_MAP_LATLNG",
    MOVE_MAP_BBOX = "MOVE_MAP_BBOX",
    REGISTER_LAYER = "REGISTER_LAYER",
    SET_LAYER_VISIBILITY = "SET_LAYER_VISIBILITY",
    SELECT_SEGMENTS = "SELECT_SEGMENTS",
}

export interface SetMapTypeAction {
    type: MapActionTypeKeys.SET_MAP_TYPE;
    mapType: MapType;
}

export interface SelectSegments {
    type: MapActionTypeKeys.SELECT_SEGMENTS;
    segments: string[];
}

export interface MoveMapLatLngAction {
    type: MapActionTypeKeys.MOVE_MAP_LATLNG;
    lat: number;
    lon: number;
    zoom: number;
    bounds: mapboxgl.LngLatBounds;
}

export interface RegisterLayerAction {
    type: MapActionTypeKeys.REGISTER_LAYER;
    layer: MapLayer<Layer.Props, Layer.State>;
}

export interface SetLayerVisibiltiyAction {
    type: MapActionTypeKeys.SET_LAYER_VISIBILITY;
    layerId: string;
    visible: boolean;
}

export interface MoveMapBboxAction {
    type: MapActionTypeKeys.MOVE_MAP_BBOX;
    bbox: number[];
  
}

export type MapActionTypes =  RegisterLayerAction | SetMapTypeAction | MoveMapLatLngAction | MoveMapBboxAction | SetLayerVisibiltiyAction | SelectSegments; 

export const setMapType = (mapType: MapType): SetMapTypeAction => ({
    type: MapActionTypeKeys.SET_MAP_TYPE,
    mapType
});

export const selectSegmentsAction = (segments: string[]): SelectSegments => ({
    type: MapActionTypeKeys.SELECT_SEGMENTS,
    segments
});


export const moveMapLatLngAction = (lat: number, lon: number, zoom: number, bounds:mapboxgl.LngLatBounds): MoveMapLatLngAction => ({
    type: MapActionTypeKeys.MOVE_MAP_LATLNG,
    lat, lon, zoom, bounds
});

export const moveMapBboxAction = (bbox: number[]): MoveMapBboxAction => ({
    type: MapActionTypeKeys.MOVE_MAP_BBOX,
    bbox
});

export const registerLayerAction = (layer:MapLayer<Layer.Props, Layer.State>): RegisterLayerAction => ({
    type: MapActionTypeKeys.REGISTER_LAYER, layer
});

export const setLayerVisibiltiyAction = (layerId:string, visible: boolean): SetLayerVisibiltiyAction => ({
    type: MapActionTypeKeys.SET_LAYER_VISIBILITY,
    layerId, visible
});

