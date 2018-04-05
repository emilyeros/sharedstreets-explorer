import * as React from 'react';
import * as styles from './style.css';
import axios from 'axios';
import { RouteComponentProps } from 'react-router';
import { MapState } from '../Map/reducers';
import { moveMapBboxAction, setMapType, setLayerVisibiltiyAction } from '../Map/actions';
import {MAP_STREET_LIGHT, MAP_SATELLITE} from '../Map/constants'
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { Menu, Icon, Layout, Switch, Button, AutoComplete, Input, Divider, Row, Col} from 'antd';
const { SubMenu } = Menu;
const Option = AutoComplete.Option;


namespace DataSider {

  export interface Props {
    mapState?:MapState,
    moveMapBbox?,
    changeMapType?,
    setLayerVisibiltiy?,
    showSharedStreets?, 
    showPickupDropoff?,
    showTraffic?,
    username?:any,
    layers?:any,
    history?:History
  }

  export interface State {
  
  }

}

function mapStateToProps(state: MapState) {
  return {
    mapState: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    moveMapBbox: bindActionCreators(moveMapBboxAction, dispatch),
    changeMapType: bindActionCreators(setMapType, dispatch),
    setLayerVisibiltiy: bindActionCreators(setLayerVisibiltiyAction, dispatch)
  };
}


@connect(mapStateToProps, mapDispatchToProps)
export class DataSider extends React.Component<DataSider.Props, DataSider.State>{

  constructor(props){
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onChangeMapType = this.onChangeMapType.bind(this);
    this.mapTypeChecked = this.mapTypeChecked.bind(this);
    this.onMenuClick = this.onMenuClick.bind(this);
    this.onGeoMenuOpen = this.onGeoMenuOpen.bind(this);
    this.showLayerMenuItems = this.showLayerMenuItems.bind(this);
  }

  searchFeatures = [];

  state = {
    
    dataSource: [],
    searchValue:String
  }

  mapTypeChecked():boolean {
    if(this.props.mapState.mapType != undefined && this.props.mapState.mapType === MAP_SATELLITE)
      return false;
    else 
      return true;
  }

  onChangeMapType(checked) {
    if(checked)
      this.props.changeMapType(MAP_STREET_LIGHT);
    else
      this.props.changeMapType(MAP_SATELLITE);
  }

  onSelect(value, option) {
    this.props.moveMapBbox(this.searchFeatures[value]);
    this.setState({searchValue: ""});
  }

  onSearch(value) {
      let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(value) + '.json?access_token=pk.eyJ1IjoidHJhbnNwb3J0cGFydG5lcnNoaXAiLCJhIjoiY2oyZ2R1aTk2MDdteDMyb2dibXpuMjdweiJ9.RtukedapVNqEAsYU-f1Vaw';
    
      axios.get(url).then( (response) => {
        this.searchFeatures = []
        let options = response.data.features.map((feature) =>{
          this.searchFeatures[feature.id] =  feature.bbox;
          return {value:feature.id,text:feature.place_name}
        });

        this.setState({
          dataSource: options
        });
      });
  }

  onMenuClick(evt) {
    this.props.setLayerVisibiltiy(evt.key, !this.props.mapState.mapLayers[evt.key].visible);
  }

  onGeoMenuOpen(evt) {
    console.log(evt);
  }

  showLayerMenuItems(mapState) {
    
      var items = [];
     
      for(var layerId in mapState.mapLayers) {
        var icon = (<span><Icon type="minus-square"/></span>)
        if(!mapState.mapLayers[layerId].visible)
          icon  = (<span><Icon type="minus-square-o"/></span>);
        var layerName = mapState.mapLayers[layerId].LAYER_NAME;
        
        items.push(<Menu.Item key={layerId}>
                          {icon}{layerName}
                        </Menu.Item>);
      }
          
      return items
  }

  render() {
    const { mapState, username, layers } = this.props;
    const { dataSource, searchValue } = this.state;

   
    // <Layout.Content><img src="/public/images/ss_logo.png" style={{height: "50px", padding: "10px"}}/> <strong>SharedStreets</strong></Layout.Content>
          

    var pickupDropoffIcon = <Icon type="minus-square-o}"/>;
    // if (showPickupDropoff) 
    //     var pickupDropoffIcon = <Icon type="minus-square}"/>
    

    return (
      <Layout.Sider collapsible style={{background:'#fff', height: '100vh'}}>
          <Row gutter={16} style={{margin:'10px'}} >
            <Col span={6}><img style={{height:'35px'}} src="/public/images/ss_logo.png"/></Col>
            <Col span={12} className={[styles.title, styles.titleCollapsible].join(' ')}><b>SharedStreets</b></Col>
          </Row>


          <Divider style={{margin:'2px'}}/>
          <Menu onClick={this.onMenuClick} mode="inline" inlineIndent={10} theme="light">
 
              <SubMenu key="dataMenu" title={<span><Icon type="switcher"/><span>Data Layers</span></span>}>
              {this.showLayerMenuItems(mapState)}
              </SubMenu>
 
              <SubMenu key="mapMenu" getPopupContainer={trigger => trigger.parentNode} title={<span><Icon type="global" /><span>Map Settings</span></span>}>
              <Menu.Item>
                  <AutoComplete placeholder="location"  onSelect={this.onSelect} onSearch={this.onSearch} dataSource={dataSource}>
                    <Input  onClick={(evt) => {evt.stopPropagation()}}/>
                  </AutoComplete>
              </Menu.Item>
              <Menu.Item><Switch checkedChildren="Streets" unCheckedChildren="Satellite" checked={this.mapTypeChecked()} onChange={this.onChangeMapType}/></Menu.Item>
            </SubMenu>
          </Menu>
      </Layout.Sider>
    );
  }
}
