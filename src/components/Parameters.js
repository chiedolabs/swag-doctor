import React, {Component, PropTypes} from 'react';
import { Table } from 'react-bootstrap';
import * as _ from 'lodash';
import {getType} from '../utils/functions';

class Parameters extends Component{

  static propTypes = {
    parameters: PropTypes.object,
    displayTypes: PropTypes.bool,
  };

  static defaultProps = {
    displayTypes: true,
  }

  render(){
    const { parameters, displayTypes } = this.props;
    let keys = [];

    for(let k in parameters) {
      keys.push(k);
    };
    let parametersOutput = _.map(keys, (key) => {
      if(displayTypes){
        return (
          <tr key={key}>
            <td>{key}</td>
            <td>{getType(parameters[key])}</td>
            <td>{parameters[key].description}</td>
          </tr>
        );
      } else {
        return (
          <tr key={key}>
            <td>{key}</td>
            <td>{parameters[key].description}</td>
          </tr>
        );
      }
    });

    let headersOutput;

    if(displayTypes){
      headersOutput = (
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      );
    } else {
      headersOutput = (
        <tr>
          <th>Field</th>
          <th>Description</th>
        </tr>
      );
    }

    return (
      <Table striped bordered condensed hover>
        <thead>
          {headersOutput}
        </thead>
        <tbody>
          {parametersOutput}
        </tbody>
      </Table>
    );
  }
};
export default Parameters;
