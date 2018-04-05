
import TiledDataService from './tiledDataService';
import * as sharedstreetsPbf from 'sharedstreets-pbf';
import { Stopwatch, getGeomUtils } from '../../util';

import * as sharedstreets from 'sharedstreets'

import * as turfHelpers from '@turf/helpers';
import buffer from '@turf/buffer';
import along from '@turf/along';
import bearing from '@turf/bearing';
import nearestPointOnLine from '@turf/nearest-point-on-line';
import lineOffset from "@turf/line-offset";
import bbox from "@turf/bbox";

const jkstra = require('jkstra');
import geojsonRbush, { RBush } from 'geojson-rbush';
import { Feature, Point, lineString, featureCollection } from '@turf/helpers';
import { LineString } from '@turf/buffer/node_modules/@turf/helpers/lib/geojson';
import { FeatureCollection } from '@turf/buffer/node_modules/@turf/helpers';
import { close } from 'fs';
import { Polygon } from 'geojson';

import { SS_TILE_URL } from '../../config';

export const getSharedStreetsDataService = ():SharedStreetsDataService => {
    
    if(window['sharedStreetsDataService'] == undefined)
        window['sharedStreetsDataService'] = new SharedStreetsDataService(SS_TILE_URL);

    return window['sharedStreetsDataService'] as SharedStreetsDataService;
}

const geomUtils = getGeomUtils();


class SharedStreetsDataService extends TiledDataService {

    REFERNECE_GEOMETRY_OFFSET = 2;
    
    intersectionIndex:RBush;
    geometryIndex:RBush;
    jkstraGraph;
    indexedTiles;
    graphTiles;
    graphVertices;
    nextVertexId;

    geometryCache;

    constructor(source:string) {

        super(source, 'pbf');

        this.indexedTiles = {};
        this.graphTiles = {};
        this.graphVertices = {};
        this.nextVertexId = 0;

        this.geometryCache = {};

        this.jkstraGraph = new jkstra.Graph();
        this.geometryIndex = geojsonRbush(9);
        this.intersectionIndex = geojsonRbush(9);

    }

    snapPoint(point:turfHelpers.Feature<turfHelpers.Point>, searchRadius:number):Promise<Feature<Point>> {

        var tileIds = this.getTileIdsFromPoint(point.geometry, false);

        return this.indexGeometryTiles(tileIds).then(() => {
            return this.getTiles(tileIds, 'reference').then(() =>{
                var sw = new Stopwatch(); 
                var features:FeatureCollection;
                //var bufferedPoint:Feature<Polygon> = buffer(point, searchRadius, {units:'meters', steps: 4});
                var bufferedPoint:Feature<Polygon> = geomUtils.envelopeBufferFromPoint(point, 10);
                features = this.geometryIndex.search(bufferedPoint);
                var closestPointDistance:number = Infinity;
                var closestPoint:Feature<Point> = null;
                
                if(features && features.features) {
                    features.features.forEach((feature:turfHelpers.Feature<turfHelpers.LineString>) => {
                
                        var featureData = this.data[feature.properties.id];
                        
                        var pointOnLine = nearestPointOnLine(feature, point, {units:'meters'});
                        if(pointOnLine.properties.dist < searchRadius && closestPointDistance > pointOnLine.properties.dist) {
                            closestPointDistance = pointOnLine.properties.dist;
                            closestPoint = pointOnLine;
                            var nextPoint = along(feature, closestPoint.properties.location + 1, {units:'meters'});

                            var cursorBearing = bearing(closestPoint, point);
                            var lineBearing = bearing(closestPoint, nextPoint);
                            
                            if(((cursorBearing < lineBearing) || (lineBearing + 180) < cursorBearing) && featureData.backReferenceId) { 
                                closestPoint.properties.geometryId = feature.properties.id;
                                closestPoint.properties.referenceId = featureData.backReferenceId; 
                                closestPoint.properties.bearing = lineBearing + 180;

                                if(closestPoint.properties.bearing > 180)
                                    closestPoint.properties.bearing = closestPoint.properties.bearing - 360;
                                
                            }
                            else {
                                closestPoint.properties.geometryId = feature.properties.id; 
                                closestPoint.properties.referenceId = featureData.forwardReferenceId;
                                closestPoint.properties.bearing = lineBearing;
                            }   

                            
                        }
        
                    });
                    return closestPoint;
                }
                else 
                    return;
            });
        });

        // turfHelpers.featureCollection(features);
    }

    getGeometry(geomId:string) {

        if(!this.geometryCache[geomId]) {
            var geometry = this.data[geomId];
            if(geometry) {
                var line = turfHelpers.lineString(sharedstreets.lonlatsToCoords(geometry.lonlats));
                this.geometryCache[geomId] = turfHelpers.feature(line.geometry, {id: geometry.id});
            }
        }
        return this.geometryCache[geomId];
    }

    getIntersectionGeometry(intersectionId:string) {
        
        if(!this.geometryCache[intersectionId]) {
            var point = turfHelpers.point([this.data[intersectionId].lon, this.data[intersectionId].lat]);
            this.geometryCache[intersectionId] = turfHelpers.feature(point.geometry, {id: this.data[intersectionId].id});
        }

        return this.geometryCache[intersectionId];
    }

    getReferenceGeometry(referenceId:string) {

        if(this.data[referenceId]) {
            if(!this.geometryCache[referenceId]) {
                var reference = this.data[referenceId];
                var geometry = this.data[reference.geometryId];
        
                if(geometry) {
                    var geom = this.getGeometry(reference.geometryId);
        
                    var offsetGeom;
        
                    if(geometry.forwardReferenceId === referenceId)
                        offsetGeom = lineOffset(geom, this.REFERNECE_GEOMETRY_OFFSET, {units: 'meters'});
                    else {
                        var reverseGeom = geomUtils.reverseLineString(geom);
                        offsetGeom = lineOffset(reverseGeom, this.REFERNECE_GEOMETRY_OFFSET, {units: 'meters'});
                    }
                        
        
                    this.geometryCache[referenceId] = offsetGeom;
                }
            }
            return this.geometryCache[referenceId];
        }
    }


    processTile(rawData:Uint8Array, tileType:string) {
        if(tileType == 'intersection')
                return sharedstreetsPbf.intersection(rawData);
            else if (tileType == 'geometry')
                return sharedstreetsPbf.geometry(rawData);
            else if (tileType == 'reference')
                return sharedstreetsPbf.reference(rawData);
    }

    indexIntersectionTiles(tileIds):Promise<string[]> {

        var sw = new Stopwatch();

        var intersectionCount = 0;

        return this.getTiles(tileIds, 'intersection').then(() => {
            tileIds.forEach((tileId) => {
                var tileKey = tileId + '.intersection';
                if(!this.indexedTiles[tileKey]){
                    var intersectionFeatures = [];
                    this.tileIndex[tileKey].forEach((itemId) => {
                        var intersectionFeature = this.getIntersectionGeometry(itemId);
                        intersectionFeatures.push(intersectionFeature);
                        intersectionCount++;
                    });
                    this.intersectionIndex.load(turfHelpers.featureCollection(intersectionFeatures));
                    this.indexedTiles[tileKey] = true;
                    
                 }
            });

            if(intersectionCount > 0)
                sw.log("indexed " +  intersectionCount + " intersections")

            return tileIds;
        });
    }

    indexGeometryTiles(tileIds):Promise<void> {

        var sw = new Stopwatch();

        var geometryCount = 0;

        return this.getTiles(tileIds, 'geometry').then(() => {
            tileIds.forEach((tileId) => {
                var tileKey = tileId + '.geometry';
                if(!this.indexedTiles[tileKey]){
                    var geometryFeatures = [];
                    this.tileIndex[tileKey].forEach((itemId) => {
                        var geometryFeature = this.getGeometry(itemId);
                        geometryFeatures.push(geometryFeature);
                        geometryCount++;
                    });
                    this.geometryIndex.load(turfHelpers.featureCollection(geometryFeatures));
                    this.indexedTiles[tileKey] = true;
                    
                 }
            });

            if(geometryCount > 0)
                sw.log("indexed " +  geometryCount + " geometrties")

            return;
        });
    }


    loadGraphData(tileIds):Promise<string[]> {

        var edgeCount = 0;
        var vertexCount = 0;

        var sw = new Stopwatch();

        return this.getTiles(tileIds, 'reference').then(() => {
            tileIds.forEach((tileId) => {
                if(!this.graphTiles[tileId]) {
                    this.tileIndex[tileId + '.' + 'reference'].forEach((itemId) => {
                        let reference = this.data[itemId];
                        let fromIntersection = this.addGraphVertex(reference.locationReferences[0].intersectionId);
                        let toIntersection = this.addGraphVertex(reference.locationReferences[reference.locationReferences.length-1].intersectionId);
                        let segementLength = 0;
                        for(var i in reference.locationReferences) {
                            if(reference.locationReferences[i].distanceToNextRef)
                                segementLength = segementLength + reference.locationReferences[i].distanceToNextRef;
                        }
                        edgeCount++;
                        this.jkstraGraph.addEdge(fromIntersection, toIntersection, {id: reference.id, length: segementLength}); 
                    });
                    this.graphTiles[tileId] = true;
                }
            
            });

            this.clearLoadingMessage();
            if(edgeCount > 0)
                sw.log("build graph for " +  edgeCount + " edges");

            return tileIds;
        });
    }

    addGraphVertex(id) {

        if(!this.graphVertices[id])
            this.graphVertices[id] = this.jkstraGraph.addVertex(this.nextVertexId++);

        return this.graphVertices[id];
    }
}


