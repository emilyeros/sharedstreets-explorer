import axios from 'axios';
import { Stopwatch } from '../../util';
import async from 'async';

import * as turfHelpers from '@turf/helpers';
const SphericalMercator = require("@mapbox/sphericalmercator");

import { message } from 'antd';

const loadingMessage = () => {
    
}


export default abstract class TiledDataService {

    DEFAULT_ZLEVEL = 12;

    tileSource:string;
    sphericalMercator;
    loadingMessage;
    fileType;
    data = {};
    tileIndex = {};
    pendingTiles = {};

    constructor(tileSource, fileType) {
        this.pendingTiles = {};
        this.fileType = fileType;
        this.tileSource = tileSource;
        this.sphericalMercator = new SphericalMercator({
            size: 256
        });
    }

    clearLoadingMessage() {
        if(this.loadingMessage) {
            this.loadingMessage();
            this.loadingMessage = false;
        }
    }

    getTileIdsFromPoint(point:turfHelpers.Point, bufferEdge:boolean):string[] {

        let bounds = [point.coordinates[0], point.coordinates[1],point.coordinates[0], point.coordinates[1]];
        let tileRange = this.sphericalMercator.xyz(bounds, this.DEFAULT_ZLEVEL);
        let tileIds = [];

        // if buffer extend tile range to +/- 1
        let bufferSize = 0;
        if(bufferEdge)
            bufferSize = 1;

        for(var x = tileRange.minX - bufferSize; x <= tileRange.maxX + bufferSize; x++){
            for(var y = tileRange.minY -  bufferSize; y <= tileRange.maxY + bufferSize; y++){
                var tileId = this.DEFAULT_ZLEVEL + '-' + x + '-' + y;
                tileIds.push(tileId);
            }
        }

        return tileIds;
    } 

    getTileIdsFromBounds(mapboxBounds:mapboxgl.LngLatBounds, bufferEdge:boolean):string[] {

        let bounds = [mapboxBounds.getWest(), mapboxBounds.getSouth(), mapboxBounds.getEast(), mapboxBounds.getNorth()];
        let tileRange = this.sphericalMercator.xyz(bounds, this.DEFAULT_ZLEVEL);
        let tileIds = [];

        // if buffer extend tile range to +/- 1
        let bufferSize = 0;
        if(bufferEdge)
            bufferSize = 1;

        for(var x = tileRange.minX - bufferSize; x <= tileRange.maxX + bufferSize; x++){
            for(var y = tileRange.minY -  bufferSize; y <= tileRange.maxY + bufferSize; y++){
                var tileId = this.DEFAULT_ZLEVEL + '-' + x + '-' + y;
                tileIds.push(tileId);
            }
        }

        return tileIds;
    }   

    getTileKey(tileId:string, tileType:string):string {
        return tileId + '.' + tileType;
    }
 
    getTiles(tileIds:string[], tileType:string):Promise<string[]> {

        var tilePromises:Promise<string>[] = tileIds.map((tileId) => {
            return this.getTile(tileId, tileType);
        });

        return Promise.all(tilePromises);
    }

    abstract processTile(data:Uint8Array, tileType:string);

    getTile(tileId:string, tileType:string) {

        var tileKey:string = this.getTileKey(tileId, tileType);

        var sw = new Stopwatch();

        if(this.tileIndex[tileKey]) {
            return new Promise((resolve, reject) => {
                resolve(tileKey);
            });
        }
        else {
            if(this.pendingTiles[tileKey]) {
                return this.pendingTiles[tileKey];
            }
            else {
                if(!this.loadingMessage)
                    this.loadingMessage = message.loading('loading data...');

                this.pendingTiles[tileKey] = new Promise((resolve, reject) => {
                    //this.loadingMessage = message.loading("loadind data...");

                    var responseType = 'arraybuffer';

                    if(this.fileType === 'json')
                        responseType = 'json';

                    var path;
                    
                    if(this.fileType === 'api') 
                        path = this.tileSource + '/' + tileType + '/' + tileId;
                    else
                        path = this.tileSource + '/' + tileKey + '.' + this.fileType;

                    this.pendingTiles[tileKey] = axios.get(path, {responseType: responseType}) 
                        .then((response) => { 
    
                            this.tileIndex[tileKey] = [];
                            var processedData 

                            if(this.fileType === 'pbf') {
                                var rawData:Uint8Array = new Uint8Array(response.data);
                                processedData = this.processTile(rawData, tileType);
                                processedData.forEach(element => {
                                    this.data[element.id] = element;
                                    this.tileIndex[tileKey].push(element.id);
                                });
                            }
                            else if(this.fileType === 'json') {
                                processedData = this.processTile(response.data, tileType); 
                                processedData.forEach(element => {
                                    this.data[element.id] = element;
                                    this.tileIndex[tileKey].push(element.id);
                                });
                            }
                
                            sw.log("loaded " + tileKey + " with " + processedData.length + " items");
                            delete this.pendingTiles[tileKey];
                            
                            if(Object.keys(this.pendingTiles).length == 0)
                                this.clearLoadingMessage();

                            resolve(tileKey);
                            
                        }).catch((err) => {
                            console.log("")
                        });
                });
                
                return this.pendingTiles[tileKey];
            }
        }
    }
}
   
