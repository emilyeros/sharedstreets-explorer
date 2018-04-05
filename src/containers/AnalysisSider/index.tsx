import * as React from 'react';
import * as style from './style.css';

import { RouteComponentProps } from 'react-router';
import { MapState } from '../Map/reducers';
import { connect } from 'react-redux';
import * as moment from 'moment';
import * as turfHelpers from '@turf/helpers';
import { Point } from 'geojson';

import 'moment/locale/en-gb';
import { getCurbDataService } from '../../middleware/data/curbDataService';
import { getSharedStreetsDataService } from '../../middleware/data/sharedStreetsDataService';

import { VictoryChart,VictoryBar, VictoryStack, VictoryLegend, VictoryAxis} from 'victory';


import { Menu, Icon, Layout, Row, Col, Switch, Button, AutoComplete, DatePicker, Divider, Slider, Alert} from 'antd';
import CurbLayer from '../../layers/curbLayer';
const { WeekPicker } =  DatePicker;
const { SubMenu } = Menu;

moment.locale('en-gb');

const sharedStreetsDataService = getSharedStreetsDataService();
const curbDataService = getCurbDataService();


namespace AnalysisSider {

  export interface Props {
    mapState?:MapState
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
export class AnalysisSider extends React.Component<AnalysisSider.Props>{

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
    this.onChangeDay = this.onChangeDay.bind(this);
    this.onChangeHour = this.onChangeHour.bind(this);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    this.onChangePercentile = this.onChangePercentile.bind(this);
    this.updateChartData = this.updateChartData.bind(this);

  }

  onChangeDay(evt) {
    const { lat, lon, zoom, bounds, mapType, selectedSegments, mapLayers} = this.props.mapState;
    const {minDay, maxDay, minHour, maxHour} = this.state;
    this.updateChartData(evt[0], evt[1], minHour, maxHour, bounds, zoom, mapLayers, selectedSegments);
    this.setState({minDay: evt[0], maxDay: evt[1]});
  }

  onChangePercentile(evt) {
    const { lat, lon, zoom, bounds, mapType, selectedSegments, mapLayers} = this.props.mapState;
    const {minDay, maxDay, minHour, maxHour} = this.state;
    this.updateChartData(evt[0], evt[1], minHour, maxHour, bounds, zoom, mapLayers, selectedSegments);
    this.setState({minDay: evt[0], maxDay: evt[1]});

  }

  onChangeHour(evt) {
    const { lat, lon, zoom, bounds, mapType, selectedSegments, mapLayers} = this.props.mapState;
    const {minDay, maxDay, minHour, maxHour} = this.state;
    this.updateChartData(minDay, maxDay, evt[0], evt[1], bounds, zoom, mapLayers, selectedSegments);
    this.setState({minHour: evt[0], maxHour: evt[1]});
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { lat, lon, zoom, bounds, mapType, selectedSegments, mapLayers} = nextProps.mapState;
    const {minDay, maxDay, minHour, maxHour} = this.state;
    if(mapLayers['curb'] && mapLayers['curb'].visible) {
      this.updateChartData(minDay, maxDay, minHour, maxHour, bounds, zoom, mapLayers, selectedSegments);
      return false;
    }
    else 
      return true;
    
  }

  updateChartData(minDay, maxDay, minHour, maxHour, bounds, zoom, mapLayers, selectedSegments) {

    this.chartData = false;
    var filter = {minDay: minDay, maxDay: maxDay, minHour: minHour, maxHour:maxHour};
    

    if( mapLayers['curb'] && zoom > 14 && bounds) {
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

          if( mapLayers['curb'] && mapLayers['curb'].visible) {
            if(selectedSegments && selectedSegments.length > 0) {
              this.chartData = curbDataService.getHourOfDaySummaryStats(selectedSegments, filter)
              this.forceUpdate();
            }
            else {
              var referenceIdsKeys = Object.keys(referenceIds)
              if(referenceIdsKeys) {
                this.chartData = curbDataService.getHourOfDaySummaryStats(referenceIdsKeys, filter)
                this.forceUpdate();
              }
            }
              
          }
    
      });
    }
    return true;
  }

 


  render() {

      const { lat, lon, zoom, bounds, mapType, selectedSegments, mapLayers} = this.props.mapState;
      
     if((mapLayers['curb'] && mapLayers['curb'].visible)) {
          return (
              <Layout.Sider collapsible collapsed={false} collapsedWidth="0" width="500" style={{background:'#fff'}}>
                  {mapLayers['curb'].analysisContent(selectedSegments)}
              </Layout.Sider>);  
      }
      else
        return (<div/>);
    }
}