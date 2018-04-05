// src/Callback/Callback.js

import { Spin } from 'antd';

import * as React from 'react';

export class Callback extends React.Component {
  
  render() {
    return (
      <div style={{padding: '100px'}}>
        <Spin/> Loading...
      </div>
    );
  }
}