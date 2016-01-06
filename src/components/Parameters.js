import React, {Component, PropTypes} from 'react';
import { Table, Button } from 'react-bootstrap';
import * as _ from 'lodash';
import {inferType} from '../utils/functions';

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

    // Get all parameter keys
    for(let parameter in parameters) {
      keys.push(parameter);
    };

    let parametersOutput = _.map(keys, (key) => {
      let required;
      if(parameters[key].optional) {
        required = <Button bsSize="xsmall">optional</Button>;
      } else {
        required = <Button bsStyle="success" bsSize="xsmall">required</Button>;
      }

      if(displayTypes){
        return (
          <tr key={key}>
            <td>{key}</td>
            <td>{inferType(parameters[key])} {required}</td>
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
