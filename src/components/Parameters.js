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
  };

  render(){
    const { parameters, displayTypes } = this.props;
    let keys = [];

    // Get all parameter keys
    for(let parameter in parameters) {
      keys.push(parameter);
    };

    let parametersOutput = _.map(keys, (key) => {
      let optional;
      if(parameters[key].optional) {
        optional = <Button bsSize="xsmall">optional</Button>;
      }

      let descriptionOutput;
      if(parameters[key].description) {
        descriptionOutput = (
          <div dangerouslySetInnerHTML={{__html: parameters[key].description}} />
        );
      }


      if(displayTypes){
        let type = parameters[key].type || inferType(parameters[key]);
        return (
          <tr key={key}>
            <td>{key}</td>
            <td>{type} {optional}</td>
            <td>{descriptionOutput}</td>
          </tr>
        );
      } else {
        return (
          <tr key={key}>
            <td>{key}</td>
            <td>{descriptionOutput}</td>
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
