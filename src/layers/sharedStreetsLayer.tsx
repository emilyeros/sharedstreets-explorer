import * as React from 'react';
import { MapLayer } from './mapLayer';
import { Stopwatch, getGeomUtils } from '../util';

import { message } from 'antd';
import buffer from '@turf/buffer';


import * as sharedstreets from 'sharedstreets';
import * as turfHelpers from '@turf/helpers';

import { bindActionCreators } from 'redux';

import { LngLatBounds, LngLat, GeoJSONSourceRaw, GeoJSONSource } from 'mapbox-gl/dist/mapbox-gl';
import { Point, FeatureCollection } from 'geojson';
import { selectSegmentsAction } from '../containers/Map/actions'
import {Layer} from '../containers/Map/reducers';

import { getSharedStreetsDataService } from '../middleware/data/sharedStreetsDataService';
import { read } from 'fs';
import { intersection } from 'sharedstreets-pbf';
import { Polygon } from 'geojson';

const jkstra = require('jkstra');
const sharedStreetsDataService = getSharedStreetsDataService();
const geomUtils = getGeomUtils();





export default class SharedStreetsLayer extends MapLayer<Layer.Props, Layer.State> {

    MIN_ZOOM_INTERSECTION = 14;
    MIN_ZOOM_GEOMETRY = 14;
    MIN_OVERLAY_GEOMETRY = 14;
    MOUSE_MOVE_WAIT = 5;

    LAYER_ID = "sharedstreets";
    LAYER_NAME = "SharedStreets";
    

    map;
    visibleTiles;
    selectedIntersections;
    processingMouseMove:boolean;
    mapRenderInProgress:boolean;
    lastMouseMove:number;
    visible:boolean;
    selectSegmentsAction;

    constructor(props, context) {
        super(props, context);

        this.selectSegmentsAction  = this.props.selectSegmentsAction;
        
        this.visibleTiles = {};
        this.lastMouseMove = 0;        
        this.selectedIntersections = []

        this.visible = false;
        this.processingMouseMove = false;

        this.onMapMove = this.onMapMove.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onBoxZoomEnd = this.onBoxZoomEnd.bind(this);
        this.onIntersectionClick = this.onIntersectionClick.bind(this);
    }

    public analysisContent() {
        return (<div/>);
    }

    public showLayer(show:boolean) {

        this.visible = show;
        this.visibleTiles = {};
        this.updateData();

    }

    public registerLayer(map) {
        
        this.map = map;

        this.visibleTiles = {};

        var featureCollection = turfHelpers.featureCollection([]);
        
        var layers = map.getStyle().layers;
        // Find the index of the first symbol layer in the map style
        var firstSymbolId;
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol') {
                firstSymbolId = layers[i].id;
                break;
            }
        }

        if(!this.map.getSource("sharedstreets-data-intersection")) {
            this.map.addSource("sharedstreets-data-intersection", {
                "type": "geojson",
                "data": featureCollection
             });
        }

        if(!this.map.getLayer("sharedstreets-intersection")) {
            this.map.addLayer({
                "id": "sharedstreets-intersection",
                "type": "circle",
                "source": "sharedstreets-data-intersection",
                "paint": {
                      // make circles larger as the user zooms from z12 to z22
                      'circle-radius': {
                          'base': 1.0,
                          'stops': [[12, 1], [22, 15]]
                      },
                      // color circles by ethnicity, using data-driven styles
                      'circle-color':"#cccccc",
                      'circle-opacity': 0.5
                  },
                minzoom: this.MIN_ZOOM_INTERSECTION,
            }, firstSymbolId);
        }

        if(!this.map.getSource("sharedstreets-data-reference-hover")) {
            this.map.addSource("sharedstreets-data-reference-hover", {
                "type": "geojson",
                "data": featureCollection
             });
        }

        if(!this.map.getLayer("sharedstreets-intersection-triange-hover")) {
            this.map.addLayer({
                "id": "sharedstreets-intersection-triange-hover",
                'type': 'symbol',
                "source": "sharedstreets-data-reference-hover",
                'layout': {
                    'icon-image': 'triangle-11',
                    'icon-allow-overlap': true,
                    'icon-ignore-placement': true,
                    'icon-size' : 2.0,
                    'icon-offset': [4, 0],
                    'icon-rotate': {
                      'type': 'identity',
                      'property': 'bearing'
                    }
                },
                'filter': ["==", 'type', 'cursor-hover'],
                minzoom: this.MIN_ZOOM_INTERSECTION,
            });
        }

        if(!this.map.getLayer("sharedstreets-intersection-point-hover")) {
            this.map.addLayer({
                "id": "sharedstreets-intersection-point-hover",
                "type": "circle",
                "source": "sharedstreets-data-reference-hover",
                "paint": {
                    // make circles larger as the user zooms from z12 to z22
                    'circle-radius': {
                        'base': 1.0,
                        'stops': [[12, 1], [22, 15]]
                    },
                    // color circles by ethnicity, using data-driven styles
                    'circle-color':"#666",
                    'circle-opacity': 0.5
                },
                'filter': ["==", 'type', 'point-hover'],
                minzoom: this.MIN_ZOOM_INTERSECTION,
            });
        }

        if(!this.map.getLayer("sharedstreets-intersection-geometry-hover")) {
            this.map.addLayer({
                "id": "sharedstreets-intersection-geometry-hover",
                'type': 'line',
                "source": "sharedstreets-data-reference-hover",
                "paint": {
                    'line-color':"#666",
                    'line-opacity': 0.5,
                    'line-width' : 5.0
                },
                'filter': ["==", 'type', 'geometry-hover'],
                minzoom: this.MIN_ZOOM_INTERSECTION,
            });
        }
    
        if(!this.map.getSource("sharedstreets-data-geometry")) {
            this.map.addSource("sharedstreets-data-geometry", {
                "type": "geojson",
                "data": featureCollection
            });
        }
        
        if(!this.map.getLayer("sharedstreets-geometry")) {
            this.map.addLayer({
                "id": "sharedstreets-geometry",
                "source": "sharedstreets-data-geometry",
                "type": "line",
                "paint": {
                    'line-color':"#108EE9",
                    'line-opacity': 0.5,
                    'line-width' : 3.0,
                    'line-dasharray' : [0.5,0.5]
                },
                minzoom: this.MIN_ZOOM_GEOMETRY,
              }, firstSymbolId);
        }
        
        // map move handler for geojson refresh
        this.map.off("moveend", this.onMapMove);
        this.map.on("moveend", this.onMapMove);

        // drag select handler
        this.map.off("boxzoomend", this.onBoxZoomEnd);
        this.map.on("boxzoomend", this.onBoxZoomEnd);

        this.map.off('click', 'sharedstreets-intersection', this.onIntersectionClick);
        this.map.on('click', 'sharedstreets-intersection', this.onIntersectionClick);

        this.map.on('mousemove', this.onMouseMove)

        this.updateData();
    }

    onMapMove(evt) {

        if (!evt.originalEvent)
            return;

        this.updateData();
    }
    
    onMouseMove(evt) {

        if(window.performance.now() - this.lastMouseMove > this.MOUSE_MOVE_WAIT ) {
            this.lastMouseMove = window.performance.now();
            if(this.map.getZoom() >= this.MIN_OVERLAY_GEOMETRY && !this.processingMouseMove && !this.mapRenderInProgress) {
                this.processingMouseMove = true;
                //var sw = new Stopwatch();
                var mousePoint = turfHelpers.point([evt.lngLat.lng, evt.lngLat.lat]); 
                var tileIds = sharedStreetsDataService.getTileIdsFromPoint(mousePoint.geometry, false);
                sharedStreetsDataService.indexIntersectionTiles(tileIds).then(() => {

                    var intersectionBuffer = 5;

                    if(this.map.getZoom() >= 17 + 2)
                        intersectionBuffer = 1;
                    var bufferedPoint:turfHelpers.Feature<Polygon> = geomUtils.envelopeBufferFromPoint(mousePoint, intersectionBuffer);

                    //var bufferedPoint:Feature<Polygon> = buffer(mousePoint, 10, {units:'meters', steps: 4});
                    var items = sharedStreetsDataService.intersectionIndex.search(bufferedPoint);
            
                    if(items.features.length >= 1) {
                        var features = turfHelpers.featureCollection([]);
                        items.features.forEach((item) => {
                            var intersectionPoint = sharedStreetsDataService.getIntersectionGeometry(item.properties.id);
                            features.features.push(intersectionPoint);
                        });
                        this.map.getSource("sharedstreets-data-reference-hover").setData(features);

                        this.processingMouseMove = false;
                        //sw.log('mouse move intersection');
                    }
                    else {
                        sharedStreetsDataService.snapPoint(mousePoint, 10).then((point:turfHelpers.Feature<Point>) =>{
                            if(point) {
                                var geometry = sharedStreetsDataService.getReferenceGeometry(point.properties.referenceId);
                                var reference = sharedStreetsDataService.data[point.properties.referenceId];
                                var startPoint = sharedStreetsDataService.getIntersectionGeometry(reference.locationReferences[0].intersectionId);
                                var endPoint = sharedStreetsDataService.getIntersectionGeometry(reference.locationReferences[reference.locationReferences.length- 1].intersectionId);
                            
                                startPoint.properties['type'] = 'point-hover';
                                endPoint.properties['type'] = 'point-hover';
                                geometry.properties['type'] = 'geometry-hover';
                                point.properties['type'] = 'cursor-hover';
                            
                                var features = turfHelpers.featureCollection([geometry, point, startPoint, endPoint]);
                                this.map.getSource("sharedstreets-data-reference-hover").setData(features);
                            }
                            else
                                this.map.getSource("sharedstreets-data-reference-hover").setData(turfHelpers.featureCollection([]));
            
                            this.processingMouseMove = false;
                            //sw.log('mouse move snap street');
                            
                        }).catch((err) =>{
                            this.processingMouseMove = false;
                        });
                    }
                });
            }
            else 
                this.map.getSource("sharedstreets-data-reference-hover").setData(turfHelpers.featureCollection([]));
        }   
    }

    onIntersectionClick(evt) {

        if(this.selectedIntersections.length >= 2) {
            this.selectedIntersections = []
            this.clearSelection();
        }

        let intersectionId = evt.features[0].properties.id;
        this.selectedIntersections.push(intersectionId);

        this.selectIntersections(this.selectedIntersections, false);

        if(this.selectedIntersections.length == 2) {

            let fromIntersection = sharedStreetsDataService.data[this.selectedIntersections[0]];
            let toIntersection = sharedStreetsDataService.data[this.selectedIntersections[1]];
            
            let bounds = new LngLatBounds();
            bounds.extend(new LngLat(fromIntersection.lon, fromIntersection.lat));
            bounds.extend(new LngLat(toIntersection.lon, toIntersection.lat));

            var routingTiles = sharedStreetsDataService.getTileIdsFromBounds(bounds, false);

            sharedStreetsDataService.loadGraphData(routingTiles).then(() => {

                var sw = new Stopwatch();
                var dijkstra = new jkstra.algos.Dijkstra(sharedStreetsDataService.jkstraGraph);

                var path = dijkstra.shortestPath(sharedStreetsDataService.graphVertices[fromIntersection.id], sharedStreetsDataService.graphVertices[toIntersection.id], {
                    edgeCost: function(e) { return e.data.length; }
                });
                sw.log("routed graph with " + path.length + " edges");

                var selectedEdges = {};

                for(var i in path) {
                    selectedEdges[path[i].data.id] = true;
                }

                this.selectSegmentsAction(Object.keys(selectedEdges));
                this.selectReferences(Object.keys(selectedEdges))

            });
        }
    }

    // handle area select 
    onBoxZoomEnd(evt) {

        this.clearSelection();
        
        var currentTiles = sharedStreetsDataService.getTileIdsFromBounds(evt.boxZoomBounds, false);

        sharedStreetsDataService.indexIntersectionTiles(currentTiles).then(() => {

            var sw = new Stopwatch();
            var bounds:turfHelpers.BBox = [evt.boxZoomBounds.getWest(), evt.boxZoomBounds.getSouth(), evt.boxZoomBounds.getEast(), evt.boxZoomBounds.getNorth()];
            var items = sharedStreetsDataService.intersectionIndex.search(bounds);

            var intersectionIds = items.features.map((item) => {
                return item.properties.id;
            });

            sharedStreetsDataService.getTiles(currentTiles, 'reference').then(() => {
                this.selectedIntersections = intersectionIds;
                this.selectIntersections(intersectionIds, true);
            });
            

            sw.log("retreived " + items.features.length);
        });

        
    }

    clearLayer() {
        this.visibleTiles = [];
        var emptyCollection = turfHelpers.featureCollection([]);
        this.map.getSource("sharedstreets-data-intersection").setData(emptyCollection);
        this.map.getSource("sharedstreets-data-geometry").setData(emptyCollection);
    }

    clearSelection() {
        this.selectIntersections([], false);
        this.selectReferences([]);
        this.selectSegmentsAction([]);
    }
    
    selectReferences(referenceIds) {
        var features = [];
        if(referenceIds) {
                referenceIds.forEach((referenceId) => {
                    features.push(sharedStreetsDataService.getReferenceGeometry(referenceId));
            });
        }

        var featureCollection = turfHelpers.featureCollection(features);

        if(!this.map.getSource("sharedstreets-data-geometry-selection")) {
            this.map.addSource("sharedstreets-data-geometry-selection", {
                "type": "geojson",
                "data": featureCollection
             });
        }
        else {
            this.map.getSource("sharedstreets-data-geometry-selection").setData(featureCollection);
        }

        if(!this.map.getLayer("sharedstreets-geometry-selection")) {
            this.map.addLayer({
                "id": "sharedstreets-geometry-selection",
                "source": "sharedstreets-data-geometry-selection",
                "type": "line",
                "paint": {
                    'line-color':"#108EE9",
                    'line-opacity': 0.75,
                    'line-width' : 4.0
                }
              });
        }
    }

    selectIntersections(intersectionIds, showReferences:boolean) {

        var features = [];
        var referenceIds = {};
        if(intersectionIds) {
            intersectionIds.forEach((intersectionId) => {
                features.push(sharedStreetsDataService.getIntersectionGeometry(intersectionId));
                var intersection = sharedStreetsDataService.data[intersectionId];

                if(showReferences) {
                    if(intersection.inboundReferenceIds) {
                        intersection.inboundReferenceIds.forEach((referenceId) => {
                            referenceIds[referenceId] = true;
                        });
                    }
    
                    if(intersection.outboundReferenceIds) {
                        intersection.outboundReferenceIds.forEach((referenceId) => {
                            referenceIds[referenceId] = true;
                        });
                    }
                }
            });
        }

        if(showReferences) {
            this.selectSegmentsAction(Object.keys(referenceIds));
            this.selectReferences(Object.keys(referenceIds));
        }
            

        var featureCollection = turfHelpers.featureCollection(features);

        if(!this.map.getSource("sharedstreets-data-intersection-selection")) {
            this.map.addSource("sharedstreets-data-intersection-selection", {
                "type": "geojson",
                "data": featureCollection
             });
        }
        else {
            this.map.getSource("sharedstreets-data-intersection-selection").setData(featureCollection);
        }

        if(!this.map.getLayer("sharedstreets-intersection-selection")) {
            this.map.addLayer({
                "id": "sharedstreets-intersection-selection",
                "type": "circle",
                "source": "sharedstreets-data-intersection-selection",
                "paint": {
                      // make circles larger as the user zooms from z12 to z22
                      'circle-radius': {
                          'base': 1.0,
                          'stops': [[12, 1], [22, 15]]
                      },
                      // color circles by ethnicity, using data-driven styles
                      'circle-color':"#108EE9",
                      'circle-opacity': 0.75
                  },
                minzoom: this.MIN_ZOOM_INTERSECTION,
            });
        }
    }


    updateData() {

        if(!this.visible) {
            var featureCollection = turfHelpers.featureCollection([]);
            this.map.getSource("sharedstreets-data-geometry").setData(featureCollection);
        }

        if(this.map.getZoom() < this.MIN_ZOOM_INTERSECTION || this.mapRenderInProgress)
             return;

        this.mapRenderInProgress = true;

        var tileIds = sharedStreetsDataService.getTileIdsFromBounds(this.map.getBounds(), false);

        // check if map needs to be redrawn 

        var currentTileKeys = {};

        tileIds.forEach((tileId) => {
            if(this.map.getZoom() >= this.MIN_ZOOM_INTERSECTION){
                currentTileKeys[sharedStreetsDataService.getTileKey(tileId, 'intersection')] = true;
            }

            if(this.map.getZoom() >= this.MIN_ZOOM_GEOMETRY){
                currentTileKeys[sharedStreetsDataService.getTileKey(tileId, 'geometry')] = true;
            }
        });

        // messy messy check for visible tile set...
        var redrawMap = false;
        for(var i in Object.keys(currentTileKeys)) {
            var tileKey = Object.keys(currentTileKeys)[i];
            if(!this.visibleTiles[tileKey])
                redrawMap = true;
        }

        var deleteKeys = [];
        for(var i in Object.keys(this.visibleTiles)) {
            var tileKey = Object.keys(this.visibleTiles)[i];
            if(!currentTileKeys[tileKey])
                deleteKeys.push(tileKey);
        }

        for(var i in deleteKeys) {
            var tileKey:string = deleteKeys[i];
            delete this.visibleTiles[tileKey];
        }

        if(!redrawMap) {
            this.mapRenderInProgress = false;
            return;
        }

        var sw = new Stopwatch();
        
        return sharedStreetsDataService.getTiles(tileIds, 'intersection').then(() => {

            var features = [];
            tileIds.forEach((tileId) => {
                var tileKey = sharedStreetsDataService.getTileKey(tileId, 'intersection');
                if(this.map.getZoom() >= this.MIN_ZOOM_INTERSECTION) {
                    if(!this.visibleTiles[tileKey]) {
                        sharedStreetsDataService.tileIndex[tileId + '.' + 'intersection'].forEach((intersectionId) => {
                            features.push(sharedStreetsDataService.getIntersectionGeometry(intersectionId));
                        });
                        this.visibleTiles[tileKey] = features;
                    }
                    else 
                        features = features.concat(this.visibleTiles[tileKey]);
                }
            });
            var geojson = turfHelpers.featureCollection(features);
            this.map.getSource("sharedstreets-data-intersection").setData(geojson);
            
            return;

        }).then(() => {

            if(this.visible) {
                sharedStreetsDataService.getTiles(tileIds, 'geometry').then(() => {
                    var features = [];
                    tileIds.forEach((tileId) => {
                        var tileKey = sharedStreetsDataService.getTileKey(tileId, 'geometry');
                        if(this.map.getZoom() >= this.MIN_ZOOM_GEOMETRY) {
                            if(!this.visibleTiles[tileKey]) {
                                sharedStreetsDataService.tileIndex[tileId + '.' + 'geometry'].forEach((geomId) => {
                                    var geom = sharedStreetsDataService.getGeometry(geomId);
                                    features.push(geom);
                                });
                                this.visibleTiles[tileKey] = features;
                            }
                            else 
                                features = features.concat(this.visibleTiles[tileKey]);
                        }
                    });
                    var geojson = turfHelpers.featureCollection(features);
                    this.map.getSource("sharedstreets-data-geometry").setData(geojson);

                    sharedStreetsDataService.clearLoadingMessage();

                    this.mapRenderInProgress = false;
                    sw.log("sharedstreets map render");
                    return;
                });
            }
            else 
                this.mapRenderInProgress = false;
            return;
        }).catch(() => {
            this.mapRenderInProgress = false;
        });    
    }
}    


