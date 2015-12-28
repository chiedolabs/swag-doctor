import React, {Component, PropTypes} from 'react';
import { Table } from 'react-bootstrap';
import * as _ from 'lodash';
import {getType} from '../utils/functions';

class Parameters extends Component{

  static propTypes = {
    parameters: PropTypes.object,
  };

  render(){
    const { parameters } = this.props;
    let keys = [];

    for(let k in parameters) {
      keys.push(k);
    };

    let parametersOutput = _.map(keys, (key) => {
      return (
        <tr>
          <td>{key}</td>
          <td>{getType(parameters[key])}</td>
          <td>{parameters[key].description}</td>
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
          {parametersOutput}
        </tbody>
      </Table>
    );
  }
};
export default Parameters;
