import React, {Component, PropTypes} from 'react';
import { Button } from 'react-bootstrap';
import { generateID, swagObToJSON } from '../utils/functions';
import Parameters from './Parameters';
import jsonString from 'json-string';
import * as _ from 'lodash';

class Action extends Component{

  static propTypes = {
    action: PropTypes.object,
  };

  render(){
    const { action } = this.props;

    let bodyParams;
    let urlParams;
    let bodyParamsOutput;
    let urlParamsOutput;

    if(action.params){
      if(action.params.body) {
        bodyParams = action.params.body;
      }

      if(action.params.url) {
        urlParams = action.params.url;
      }
    }

    if(urlParams){
      urlParamsOutput = (
        <div>
          <h4>URL Parameters</h4>
          <Parameters parameters={urlParams} type={false} />
        </div>
      );
    }

    if(bodyParams){
      bodyParamsOutput = (
        <div>
          <h4>Body Parameters</h4>
          <Parameters parameters={bodyParams} />
        </div>
      );
    }

    // Need to generate the json response output from the json object here
    // so I can use it later.
    let responsesOutput = action.responses.map((response) => {
      let resBody = swagObToJSON(response.body);
      let parsedResBody;

      if(_.isObject(resBody)){
        parsedResBody = jsonString(resBody);
      } else {
        parsedResBody = resBody;
      }

      return (
        <div key={response.status}>
          <h4>{response.name} (status: {response.status})</h4>
          <h5>Fields:</h5>
          <h5>Example:</h5>
          <pre>
            {parsedResBody}
          </pre>
        </div>
      );
    });


    return (
      <div>
        <Button bsStyle="success" className="pull-left">{action.method}</Button>
        <h3 id={`${generateID(action.name)}`}>
          &nbsp;{action.name}
        </h3>
        <br/>
        {urlParamsOutput}
        {bodyParamsOutput}
        <div>
          {responsesOutput}
        </div>
      </div>
    );
  }
};
export default Action;
