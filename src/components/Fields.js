import React, {Component, PropTypes} from 'react';
import { Table } from 'react-bootstrap';
import * as _ from 'lodash';
import {getType} from '../utils/functions';

class Fields extends Component{

  static propTypes = {
    fields: PropTypes.object,
    sourceObject: PropTypes.object,
  };

  render(){
    const { fields } = this.props;
    let keys = [];

    for(let k in fields) {
      keys.push(k);
    };

    let fieldsOutput = _.map(keys, (key) => {
      let indentation = key.split('.').length;
      let padding = 0;
      for(let i = 0; i < (indentation-1)*2; i++) {
        padding += 10;
      }
      let indentedKey = <span style={{paddingLeft: padding}}>{key}</span>;
      let type;

      if(_.isArray(fields[key])) {
        type = (typeof fields[key][0]) + '[]'; 
      } else {
        type = typeof fields[key];
      }

      return (
        <tr key={key}>
          <td>{indentedKey}</td>
          <td>{type}</td>
          <td>{fields[key].description}</td>
        </tr>
      );
    });

    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {fieldsOutput}
        </tbody>
      </Table>
    );
  }
};
export default Fields;
