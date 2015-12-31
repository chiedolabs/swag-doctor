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

    for(let field in fields) {
      keys.push(field);
    };

    let fieldsOutput = _.map(keys, (key) => {
      // Indent the fields that are nested fields
      let padding = 0;
      for(let i = 0; i < (key.split('.').length -1)*2; i++) {
        padding += 10;
      }
      let indentedKey = <span style={{paddingLeft: padding}}>{key}</span>;

      let type;
      // For arrays, we'll need to parse the key a little differently since it has the
      // [] syntax in the key.
      if(_.isArray(fields[key])) {
        type = (typeof fields[key][0]) + '[]';
      } else {
        type = typeof fields[key];
      }

      // Now we need to generate the descriptions using the source object to
      // do so. It's not clean but works... so far. lol.
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
          i = i.replace('[]', []);
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
