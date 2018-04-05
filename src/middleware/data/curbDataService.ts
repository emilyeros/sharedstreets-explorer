
import TiledDataService from './tiledDataService';
import * as sharedstreetsPbf from 'sharedstreets-pbf';
import { Stopwatch, getGeomUtils } from '../../util';

import * as sharedstreets from 'sharedstreets'

import * as probuf_minimal from "protobufjs/minimal";
import * as Proto from "../../proto/linear/linear";

import * as turfHelpers from '@turf/helpers';
import along from '@turf/along';
import lineOffset from "@turf/line-offset";

import { PICKUP_EVENT_LABEL, DROPOFF_EVENT_LABEL, EVENT_FILE_TYPE } from '../../config';


import { getSharedStreetsDataService } from './sharedStreetsDataService';

import { referenceId } from 'sharedstreets';
import { reference } from 'sharedstreets-pbf';
import { MultiPoint, Point } from '@turf/destination/node_modules/@turf/helpers';

const sharedStreetsDataService = getSharedStreetsDataService();

export const getCurbDataService = ():CurbDataService => {
    
    if(window['curbDataService'] == undefined)
        window['curbDataService'] = new CurbDataService('/public/data/tiles/curb');

    return window['curbDataService'] as CurbDataService;
}

const geomUtils = getGeomUtils();

class CurbDataService extends TiledDataService {
    
    indexedTiles;
    geometryCache;

    constructor(source:string) {

        super(source, 'pbf');

        this.indexedTiles = {};
        this.geometryCache = {};
    }

    getSummaryStats(referenceId) {

        var linearReferences = this.data[referenceId];

        var summary = {}

        for(var i = 0; i <= linearReferences.binPosition.length - 1; i++) {
            var binPosition = linearReferences.binPosition[i];

            for(var j = 0; j <= linearReferences.binnedPeriodicData[i].periodOffset.length - 1; j++) {
                var periodOffset = linearReferences.binnedPeriodicData[i].periodOffset[j];

                for(var k = 0; k <= linearReferences.binnedPeriodicData[i].bins[j].dataType.length - 1; k++) {
                    var dataType = linearReferences.binnedPeriodicData[i].bins[j].dataType[k];
                    
                    if(summary[dataType] == undefined)
                        summary[dataType] = [];

                    if(summary[dataType][binPosition] == undefined) 
                        summary[dataType][binPosition] = 0;

                    summary[dataType][binPosition] = summary[dataType][binPosition] + parseInt(linearReferences.binnedPeriodicData[i].bins[j].count[k]);
                }
            }
        }

        return summary;
    }

    getHourOfDaySummaryStats(referenceIds, filter) {

        var summary = {};

        if(!summary[PICKUP_EVENT_LABEL]) {
            summary = {};
            summary[PICKUP_EVENT_LABEL] = [];
            summary[DROPOFF_EVENT_LABEL] = [];

            for(var i = 0; i< 24; i++) {
                summary[PICKUP_EVENT_LABEL].push({x: i, y: 0});
                summary[DROPOFF_EVENT_LABEL].push({x: i, y: 0});
            }
        }

        referenceIds.forEach((referenceId) => {

            var linearReferences = this.data[referenceId];
            if(linearReferences) {
                for(var i = 0; i <= linearReferences.binPosition.length - 1; i++) {
                    var binPosition = linearReferences.binPosition[i];
    
                    for(var j = 0; j <= linearReferences.binnedPeriodicData[i].periodOffset.length - 1; j++) {
                        var periodOffset = linearReferences.binnedPeriodicData[i].periodOffset[j];
    
                        for(var k = 0; k <= linearReferences.binnedPeriodicData[i].bins[j].dataType.length - 1; k++) {
                            var dataType = linearReferences.binnedPeriodicData[i].bins[j].dataType[k];
                        
                            var dayOfWeek = Math.floor(periodOffset / 23);

                            if(!filter || (filter.minDay <= dayOfWeek && filter.maxDay >= dayOfWeek)) {

                                var hourOfDay = (periodOffset % 23) + 10;
                                if(hourOfDay > 23)
                                    hourOfDay = hourOfDay - 23;
        
                                if(summary[dataType] == undefined)
                                    summary[dataType] = [];
        
                                if(summary[dataType][hourOfDay] == undefined) 
                                    summary[dataType][hourOfDay] = {x: hourOfDay, y: 0};

                                if(filter && (filter.minHour > hourOfDay || filter.maxHour < hourOfDay))
                                    summary[dataType][hourOfDay]['fillOpacity'] = 0.1
        
                                summary[dataType][hourOfDay].y = summary[dataType][hourOfDay].y + parseInt(linearReferences.binnedPeriodicData[i].bins[j].count[k]);
                            }

                            
                                
                        }
                    }
                }
            }
        });

        
        return summary;
    }


    getBinPoints(referenceId:string) {
        
        if(!this.geometryCache[referenceId]) {
   
            var summary = this.getSummaryStats(referenceId);

            var numBins = this.data[referenceId].numberOfBins;
            var referenceLength = this.data[referenceId].referenceLength / 100;

            var reference = sharedStreetsDataService.data[referenceId];
            if(reference) {
                var geometry = sharedStreetsDataService.data[reference.geometryId];
                
                if(geometry) {
                    var points = [];

                    Object.keys(summary).forEach((dataType) => {
                        
                        var line = sharedStreetsDataService.getGeometry(reference.geometryId);
                        
                        var offsetLine;
                        
                        var circleOffset;
                        if(dataType === DROPOFF_EVENT_LABEL)
                            circleOffset = 8
                        else 
                            circleOffset = 4;

                        try {
                            if(geometry.forwardReferenceId === referenceId)
                                offsetLine = lineOffset(line, circleOffset, {units: 'meters'});
                            else {
                                var reverseGeom = geomUtils.reverseLineString(line);
                                offsetLine = lineOffset(reverseGeom, circleOffset, {units: 'meters'});
                            }
                        }
                        catch(err) {
                            offsetLine = line;
                        }
                        
                        var binLength = referenceLength / numBins;

                        for(var binPosition = 0; binPosition < summary[dataType].length; binPosition++) {

                            var point = along(offsetLine, binLength * binPosition + (binLength/2), {units:'meters'});

                            point.properties['count'] = Math.sqrt(summary[dataType][binPosition]);
                            point.properties['type'] = dataType;
                            
                            if(point.properties['count'] > 0)
                                points.push(point);
                        }
                    });

                    this.geometryCache[referenceId] = turfHelpers.featureCollection(points);
                }
            }
        }

        return this.geometryCache[referenceId];
    }

    processTile(rawData:Uint8Array, tileType:string) {

        var reader = new probuf_minimal.Reader(rawData);
        var results = [];
        while (reader.pos < reader.len) {
            var result = Proto.SharedStreetsWeeklyBinnedLinearReferences.decodeDelimited(reader).toJSON();
            result.id = result.referenceId;
            delete result.referenceId;  
            results.push(result);
        }
        return results; 
    }

    getCurbTiles(tileIds):Promise<string[][]> {

        var tileRequests:Promise<string[]>[] = [];

        tileRequests.push(sharedStreetsDataService.getTiles(tileIds, 'geometry'));
        tileRequests.push(sharedStreetsDataService.getTiles(tileIds, 'reference'));
        tileRequests.push(super.getTiles(tileIds,  EVENT_FILE_TYPE));

        return Promise.all(tileRequests);

    }
}


