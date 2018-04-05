import * as React from 'react';
import * as style from './style.css';
import { RouteComponentProps } from 'react-router';
import {DataSider, AnalysisSider, Map} from '../../containers/';
import * as moment from 'moment';
import 'moment/locale/en-gb';

import { Menu, Icon, Layout, Switch, Button, AutoComplete, DatePicker} from 'antd';
const { WeekPicker } =  DatePicker;
const { SubMenu } = Menu;

moment.locale('en-gb');


export interface AppHisory {
  params:{lat:string, lon:string, zoom:string}
}

export namespace App {

  export interface Props {
    match:AppHisory;
    history:any;
    username:any;
    layers:any;
  }

  export interface State {
    streetsChecked:boolean, 
  }
}

export class App extends React.Component<App.Props,App.State> {

  constructor(props) {
    super(props);
    this.state = {streetsChecked:true}
  }

  onMapTypeChanged(checked) {

  }


  mapType() {

    let streetsChecked = false;
    if(this.state.streetsChecked)
      streetsChecked = true;

    return;
  }

  dataMenu() {

    return (<SubMenu key="sub2" title={<span><Icon type="folder" /><span>Data</span></span>}><WeekPicker/></SubMenu>);

  }

  render() {

    var {lat, lon, zoom} = this.props.match.params;

    var mapState = {lat:parseFloat(lat), lon:parseFloat(lon), zoom:parseFloat(zoom)};
    
    return (
      <Layout style={{ minHeight: '100vh' }} >
        <DataSider username={this.props.username} layers={this.props.layers} history={this.props.history}/>   
        <Layout.Content>
          <Map initialState={mapState}/>
        </Layout.Content>
        <AnalysisSider/>
      </Layout>
    );
  }
}