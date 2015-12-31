import React, {Component, PropTypes} from 'react';
import { Table } from 'react-bootstrap';
import * as _ from 'lodash';

class Fields extends Component{

  static propTypes = {
    fields: PropTypes.object,
    sourceObject: PropTypes.object,
  };

  render(){
    const { fields, sourceObject } = this.props;
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

      let description = '';
      let source;
      let count = 1;
      for(let i of key.split('.')){
        if(description === '') {
          source = sourceObject;
        } else {
          source = description;
        }

        if(count === key.split('.').length) {
          if(source && source[i] && source[i].description){
            description = source[i].description;
          } else {
            description = '';
          }
        } else {
          let subject;
          if(_.endsWith(i, '[]')) {
            subject = source[i.replace('[]', '')];
          } else {
            subject = source[i];
          }

          if(_.isFunction(subject.resolve)) {
            description = subject.resolve();
          } else {
            description = subject.resolve;
          }

          if(_.endsWith(i, '[]')) {
            description = description[0];
          }
        }
        count++;
      }

      return (
        <tr key={key}>
          <td>{indentedKey}</td>
          <td>{type}</td>
          <td>{description}</td>
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
