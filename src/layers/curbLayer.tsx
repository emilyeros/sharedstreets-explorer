import * as probuf_minimal from "protobufjs/minimal";
import * as Proto from "../proto/linear/linear";
import {MapLayer} from './mapLayer';
import async from 'async';
import { connect } from 'react-redux';
import * as React from 'react';

import * as turfHelpers from '@turf/helpers';
import { MapState } from '../containers/Map/reducers';

import { Stopwatch } from '../util';
import { LngLatBounds, LngLat, GeoJSONSourceRaw } from 'mapbox-gl/dist/mapbox-gl';
import {Layer} from '../containers/Map/reducers';
import { getCurbDataService } from '../middleware/data/curbDataService';
import { getSharedStreetsDataService } from '../middleware/data/sharedStreetsDataService';

import { Menu, Icon, Layout, Row, Col, Switch, Button, AutoComplete, DatePicker, Divider, Slider, Alert} from 'antd';
import { VictoryChart,VictoryBar, VictoryStack, VictoryLegend, VictoryAxis} from 'victory';

import { PICKUP_EVENT_LABEL, DROPOFF_EVENT_LABEL, EVENT_FILE_TYPE, DOT_SIZE_MAX_VALUE} from '../config';


const curbDataService = getCurbDataService();
const sharedStreetsDataService  = getSharedStreetsDataService();


namespace CurbAnalysisSider {

    export interface Props {
      mapState?:MapState,
      selectedSegments?:string[]
    }
  
    export interface State {
    
    }
  
  }
  
  function mapStateToProps(state: MapState) {
    return {
      mapState: state,
    };
  }

@connect(mapStateToProps)
export class CurbAnalysisSider extends React.Component<CurbAnalysisSider.Props>{

  state = {
    chartData:{},
    minDay:0,
    maxDay:6,
    minHour:0,
    maxHour:23,
    speedPercentile:0.8
  }

  chartData = {};

  constructor(a, b) {
    super(a, b);
    this.chartData = {};
    this.chartData[PICKUP_EVENT_LABEL] = [];
    this.chartData[DROPOFF_EVENT_LABEL] = [];
    for(var i = 0; i< 24; i++) {
        this.chartData[PICKUP_EVENT_LABEL].push({x: i, y: 0});
        this.chartData[DROPOFF_EVENT_LABEL].push({x: i, y: 0});
    }
    this.onChangeDay = this.onChangeDay.bind(this);
    this.onChangeHour = this.onChangeHour.bind(this);

  }

  onChangeDay(evt) {
    const { lat, lon, zoom, bounds, mapType, mapLayers, selectedSegments} = this.props.mapState;
    const {minDay, maxDay, minHour, maxHour} = this.state;
    this.updateChartData(evt[0], evt[1], minHour, maxHour, bounds, zoom, mapLayers, selectedSegments);
    this.setState({minDay: evt[0], maxDay: evt[1]});
  }

  onChangePercentile(evt) {
    const { lat, lon, zoom, bounds, mapType, mapLayers, selectedSegments} = this.props.mapState;
    const {minDay, maxDay, minHour, maxHour} = this.state;
    this.updateChartData(evt[0], evt[1], minHour, maxHour, bounds, zoom, mapLayers, selectedSegments);
    this.setState({minDay: evt[0], maxDay: evt[1]});

  }

  onChangeHour(evt) {
    const { lat, lon, zoom, bounds, mapType, mapLayers, selectedSegments} = this.props.mapState;
    const {minDay, maxDay, minHour, maxHour} = this.state;
    this.updateChartData(minDay, maxDay, evt[0], evt[1], bounds, zoom, mapLayers, selectedSegments);
    this.setState({minHour: evt[0], maxHour: evt[1]});
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { lat, lon, zoom, bounds, mapType, mapLayers, selectedSegments} = nextProps.mapState;
    const {minDay, maxDay, minHour, maxHour} = this.state;
    if((mapLayers['curb'] && mapLayers['curb'].visible) ) {
      this.updateChartData(minDay, maxDay, minHour, maxHour, bounds, zoom, mapLayers, selectedSegments);
      return false;
    }
    else 
      return true;
    
  }

  updateChartData(minDay, maxDay, minHour, maxHour, bounds, zoom, mapLayers, selectedSegments) {

    this.chartData = false;
    var filter = {minDay: minDay, maxDay: maxDay, minHour: minHour, maxHour:maxHour};
    

    if( (mapLayers['curb'] && mapLayers['curb'].visible ) && zoom > 14 && bounds) {
      var currentTiles = sharedStreetsDataService.getTileIdsFromBounds(bounds, false);

      sharedStreetsDataService.indexIntersectionTiles(currentTiles).then(() => {

          var searchBounds:turfHelpers.BBox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()];
          var items = sharedStreetsDataService.intersectionIndex.search(searchBounds);

          var referenceIds = {};

          var intersectionIds = items.features.forEach((item) => {
            var intersectionId = item.properties.id;
            if(intersectionId) {
              
                var intersection = sharedStreetsDataService.data[intersectionId];
                  
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

        if(selectedSegments && selectedSegments.length > 0) {
            this.chartData = curbDataService.getHourOfDaySummaryStats(selectedSegments, filter)
            this.forceUpdate();
        }
        else{
            var referenceIdsKeys = Object.keys(referenceIds)
            if(referenceIdsKeys) {
                this.chartData = curbDataService.getHourOfDaySummaryStats(referenceIdsKeys, filter)
                this.forceUpdate();
            }
        }
        
      });
    }
    return true;
  }

  render() {

    const dayMarks = {
      0: 'Mon',
      1: 'Tue',
      2: 'Wed',
      3: 'Thu',
      4: 'Fri',
      5: 'Sat',
      6: 'Sun'
    };

    const hourMarks = {
      0: '12am',
      6: '6am',
      12: 'noon',
      18: '6pm'
    };

    
      return (
        <Layout.Content style={{padding:"10px"}}>
            <h3>Pick-up/Drop-off by Hour of Day</h3>
                <div>
                <div style={{display: 'inline-block', height: '15px', width: '15px', background: 'rgba(0, 0, 255, 0.5)'}}></div> Pick-up <div style={{display: 'inline-block', height: '15px', width: '15px', background: 'rgba(255, 0, 0, 0.5)'}}></div> Drop-off  
                    <VictoryChart domainPadding={{ x: 30, y: 20 }} domain={{x: [0, 23]}}>
                    <VictoryStack colorScale={["blue", "red"]}>
                        <VictoryBar style={{data: { fillOpacity: 0.7}}} data={this.chartData[PICKUP_EVENT_LABEL]}/>
                        <VictoryBar style={{data: { fillOpacity: 0.7}}} data={this.chartData[DROPOFF_EVENT_LABEL]}/>
                    </VictoryStack>
                    <VictoryAxis label="Hour of Day" tickValues={[6, 12, 18, 24]}
                                tickFormat={(t) => {
                                if(t) {
                                    if(t < 12)
                                    return t + 'am';
                                    else if(t == 12)
                                    return 'noon';
                                    else if(t < 23)
                                    return t - 12 + 'pm';
                                    else 
                                    return 'midnight'
                                }
                                else 
                                    return "";                                  
                                }}/>
                    </VictoryChart>
                <div style={{padding:"25px"}}>
                <h4>Filters</h4>
                    Days of Week
                    <Slider range onAfterChange={this.onChangeDay} marks={dayMarks} tipFormatter={null} min={0} max={6} defaultValue={[0, 6]}/> 
                    Hours of Day
                    <Slider range onAfterChange={this.onChangeHour} marks={hourMarks} tipFormatter={null} min={0} max={23} defaultValue={[0, 23]}/>

                    {/* Road Type
                    <Slider range defaultValue={[0, 23]}/> */}
                </div>
                </div>
            </Layout.Content>);
            
  }
}

export default class CurbLayer extends MapLayer<Layer.Props, Layer.State> {

    MIN_ZOOM_OVERLAY = 12;
    
    LAYER_ID = "curb";
    LAYER_NAME = "Pick-up/Drop-off";

    map;
    mapLayer;
    visibleTiles;
    syncTiles;
    mapRenderInProgress;

    constructor(props, context) {
        super(props, context);
        this.visible = false;
        this.visibleTiles = {};
        this.onMapMove = this.onMapMove.bind(this);
    }

    public showLayer(show) {
        this.visible = show;
        this.updateData();
    }

    public analysisContent(selectedSegments) {
        return (<CurbAnalysisSider selectedSegments={selectedSegments}/>)
    }

    public registerLayer(map) {
        
        this.map = map;

        this.visibleTiles = {};

        var featureCollection = turfHelpers.featureCollection([]);

        if(!this.map.getSource("curb-data")) {
            this.map.addSource("curb-data", {
                "type": "geojson",
                "data": featureCollection
             });
        }

        if(!this.map.getLayer("curb-overlay")) {
            this.mapLayer = this.map.addLayer({
                "id": "curb-overlay",
                "type": "circle",
                "source": "curb-data",
                "paint": {
                      // make circles larger as the user zooms from z12 to z22
                      'circle-radius': {
                        property: 'count',
                        stops: [
                        [{zoom: 8, value: 0}, 0],
                        [{zoom: 8, value: DOT_SIZE_MAX_VALUE}, 2],
                        [{zoom: 11, value: 0}, 0],
                        [{zoom: 11, value: DOT_SIZE_MAX_VALUE}, 5],
                        [{zoom: 16, value: 0}, 0],
                        [{zoom: 16, value: DOT_SIZE_MAX_VALUE}, 30]
                        ]
                       },
                      // color circles by ethnicity, using data-driven styles
                      'circle-color': [
                        'match',
                        ['get', 'type'],
                        PICKUP_EVENT_LABEL, '#0000ff',
                        DROPOFF_EVENT_LABEL, '#ff0000',
                        '#ccc'
                        ],
                      'circle-opacity': 0.5
                  },
                minzoom: this.MIN_ZOOM_OVERLAY,
            });
        }

        // map move handler for geojson refresh
        this.map.off("moveend", this.onMapMove);
        this.map.on("moveend", this.onMapMove);


    }

    onMapMove(evt) {
        if (!evt.originalEvent)
            return;
       this.updateData();
    }

    updateData() {

        if(!this.visible) {
            this.visibleTiles = {};
            var featureCollection = turfHelpers.featureCollection([]);
            this.map.getSource("curb-data").setData(featureCollection);
            return;
        }

        if(this.map.getZoom() < this.MIN_ZOOM_OVERLAY || this.mapRenderInProgress)
             return;

        this.mapRenderInProgress = true;

        var tileIds = curbDataService.getTileIdsFromBounds(this.map.getBounds(), false);

        // check if map needs to be redrawn 

        var currentTileKeys = {};

        tileIds.forEach((tileId) => {
            if(this.map.getZoom() >= this.MIN_ZOOM_OVERLAY){
                currentTileKeys[sharedStreetsDataService.getTileKey(tileId, EVENT_FILE_TYPE)] = true;
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
            

        curbDataService.getCurbTiles(tileIds).then(() => {
            var featureCollection = turfHelpers.featureCollection([]);
            tileIds.forEach((tileId) => {
                var tileKey = curbDataService.getTileKey(tileId, EVENT_FILE_TYPE);
                if(!this.visibleTiles[tileKey]) {
                    this.visibleTiles[tileKey] = []; 
                    curbDataService.tileIndex[tileKey].forEach((referenceId) => {
                        
                            var features = curbDataService.getBinPoints(referenceId);
                            if(features) {
                                features.features.forEach((feature) => {
                                    this.visibleTiles[tileKey].push(feature);
                                });            
                            }
                        });  
                    }
                    featureCollection.features = featureCollection.features.concat(this.visibleTiles[tileKey]); 
                });
            
                this.map.getSource("curb-data").setData(featureCollection);
                this.mapRenderInProgress = false;
        }).catch((err) =>{
            this.mapRenderInProgress = false;
        });
        
    }  
}