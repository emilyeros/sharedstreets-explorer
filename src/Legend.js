import React, {Component} from 'react';
import { Badge} from 'antd';

export default class verlay extends Badge {

  render() {
    return (
      <span {...restProps} className={badgeCls}>
        <span className={`${prefixCls}-status-text`}>test</span>
      </span>
    );
  }
}
