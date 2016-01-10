import React, {Component, PropTypes} from 'react';
import { Table, Button } from 'react-bootstrap';
import * as _ from 'lodash';
import type from 'type-of';

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

    let matchedIndentedKeys = [];
    let fieldsOutput = _.map(keys, (key) => {
      // Indent the fields that are nested fields
      let padding = 0;
      let splitKey = key.split('.');
      for(let i = 0; i < (splitKey.length -1)*2; i++) {
        padding += 10;
      }
      let specificField;
      // Get the last part separated by the period
      // FOr example, get 'id' from 'user.test.id'
      specificField = splitKey[splitKey.length - 1].replace('[]','');
      let indentedKey = <span style={{paddingLeft: padding}}>{specificField}</span>;

      let typeOutput;
      // For arrays, we'll need to parse the key a little differently since it has the
      // [] syntax in the key.
      if(key.endsWith('[]')) {
        typeOutput = type(fields[key]) + '[]';
      } else {
        typeOutput = type(fields[key]);
      }

      // Now we need to generate the descriptions using the source object to
      // do so. It's not clean but works... so far. lol.
      let description = '';
      let source;
      let count = 1;
      let required;
      for(let i of key.split('.')){
        if(description === '') {
          source = sourceObject;
        } else {
          source = description;
        }

        if(count === key.split('.').length) {
          i = i.replace('[]', []);
          if(source && source[i]){
            if(source[i].optional) {
              required = <Button bsSize="xsmall">optional</Button>;
            }

            if(source[i].description) {
              description = source[i].description;
            } else {
              description = '';
            }

            // Override the inferred type if one is specified
            if(source[i].type) {
              typeOutput = source[i].type;
            }
          }
        } else {
          let subject;

          if(_.endsWith(i, '[]')) {
            subject = source[i.replace('[]', '')];
          } else {
            subject = source[i];
          }

          if(subject) {
            if(_.isFunction(subject.example)) {
              description = subject.example();
            } else {
              description = subject.example;
            }

            if(_.endsWith(i, '[]')) {
              description = description[0];
            }
          }
        }
        count++;
      }

      let descriptionOutput;
      if(description) {
        descriptionOutput = (
          <div dangerouslySetInnerHTML={{__html: description}} />
        );
      }

      if(_.includes(matchedIndentedKeys, padding+specificField) === false) {
        matchedIndentedKeys.push(padding+specificField);
        return (
          <tr key={key}>
            <td>{indentedKey}</td>
            <td>{typeOutput} {required}</td>
            <td>{descriptionOutput}</td>
          </tr>
        );
      } else {
        return null;
      }
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
