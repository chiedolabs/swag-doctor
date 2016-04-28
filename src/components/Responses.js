import React, {Component, PropTypes} from 'react';
import { modelToJSON } from '../utils/functions';
import { Panel } from 'react-bootstrap';
import Fields from './Fields';
import jsonString from 'json-string';
import * as _ from 'lodash';
import ob from 'objob';

class Responses extends Component{

  static propTypes = {
    responses: PropTypes.array,
  };

  render(){
    let responsesOutput = this.props.responses.map((response) => {
      let resBody = modelToJSON(response.body);
      let parsedResBody;

      if(_.isObject(resBody)){
        parsedResBody = jsonString(resBody);
      } else {
        parsedResBody = resBody;
      }

      let resFields;
      if(_.isObject(resBody)){
        let flatFields = ob.flatten(modelToJSON(response.body));
        let flatFieldsWithoutArrays = {};
        // We need to get rid of the array details before passing it to the
        // fields component
        for(let key in flatFields) {
          let originalKey = key;
          key = key.replace(/(\.\d$)/, '');
          key = key.replace(/(\.\d\.)/, '.');
          flatFieldsWithoutArrays[key] = flatFields[originalKey];
        }

        resFields = (
          <div>
            <h5>Fields:</h5>
            <Fields sourceObject={response.body} fields={flatFieldsWithoutArrays} />
          </div>
        );
      }

      return (
        <Panel key={response.status} header={<span>{response.name} (status: {response.status})</span>}>
          {resFields}
          <Panel header="Example Response" eventKey={response.status} collapsible>
            <pre>
              {parsedResBody}
            </pre>
          </Panel>
          <br/>
        </Panel>
      );
    });
    return (
      <div>
        {responsesOutput}
      </div>
    );
  }
};
export default Responses;
