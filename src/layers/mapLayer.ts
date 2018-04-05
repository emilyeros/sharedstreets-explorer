
import * as mapboxgl from 'mapbox-gl';
import * as React from 'react';


export abstract class MapLayer<P, S> extends React.Component<P, S>  {

    abstract LAYER_ID:string;
    abstract LAYER_NAME:string;

    visible:boolean;

    abstract showLayer(show:boolean);

    abstract analysisContent(selectedSegments);

    abstract registerLayer(map);

}