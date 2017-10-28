import React, { Component } from 'react';
import './App.css';
import {Layout, Menu, Icon, Switch, Row, Col, Badge, Slider} from 'antd';
import MapGL from 'react-map-gl';
import {json as requestJson} from 'd3-request';
import Map from './Map.js';
import { map as _map} from 'underscore';
import { filter as _filter} from 'underscore';
import { first as _first} from 'underscore';
import { last as _last} from 'underscore';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const EVENT_COLOR = event => {
    switch ( event ) {
        case "HardBrake": return [240,65,52];
        case "OverSpeeding": return [0,168,84];
        case "AggressiveAcceleration": return [16,142,233];
        case "PhoneUse": return [100,100,100];
    }
};

const MAPBOX_TOKEN = 'pk.eyJ1IjoidHJhbnNwb3J0cGFydG5lcnNoaXAiLCJhIjoiY2oyZ2R1aTk2MDdteDMyb2dibXpuMjdweiJ9.RtukedapVNqEAsYU-f1Vaw';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        viewport: {
          longitude: -73.9448946198631,
          latitude: 40.7789895974415,
          zoom: 13,
          maxZoom: 20,
          pitch: 0,
          bearing: 0,
          width: 500,
          height: 500
        },
        rawData: null,
        filter: {useMap: true},
        mapType : <Switch defaultChecked={true} checkedChildren="Map" unCheckedChildren="Satellite" onChange={(e) => this.toggleMapType(e)} />
    };

  }

  toggleMapType(checked) {

    var filter = this.state.filter;

    filter.useMap = checked

    this.setState({filter:filter});

  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this));
    this._resize();
  }

  _resize() {
    this._onChangeViewport({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  _onChangeViewport(viewport) {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });
  }

  formatHour(hour) {
    if(hour < 12)
      return hour + "am";
    else if (hour == 12)
      return "12pm"
    else if(hour > 12)
      return (hour - 12) + "pm"
    else
      return null;
  }

  render() {

    const {viewport, rawData, filter} = this.state;


    return (
      <div className="App">
          <Layout>
            <Sider theme="dark" width={250}>
              <Content style={{ padding: '10px'}} >
                <Row gutter={8}><Col span={24} ><img src="/ss_logo.png" width={40} style={{padding: '5px', float: 'left',
                'vertical-align': 'middle'}}/><h2 style={{color: 'rgba(255, 255, 255, 0.67)', 'margin-top': '8px'}}>SharedStreets</h2></Col></Row>
              </Content>
              <Menu
                mode="inline"
                theme="dark"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}>
                <SubMenu key="sub1" title="data explorer">
                  <Content style={{ padding: '10px'}} >
                      Click on intersection to view <a href="">details</a>.
                  </Content>
                </SubMenu>
              </Menu>
              <Content style={{ padding: '10px'}} >
                <Row gutter={8}><Col span={24}>{this.state.mapType}</Col></Row>
              </Content>
            </Sider>
            <Layout style={{ padding: '0px' }}>
              <Content style={{ background: '#fff', padding: 0, margin: 0, minHeight: 280 }}>
                <Map viewport={viewport}
                  filter={filter}/>
              </Content>
            </Layout>
          </Layout>
      </div>
    );
  }
}

export default App;
