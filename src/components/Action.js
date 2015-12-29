import React, {Component, PropTypes} from 'react';
import { Button } from 'react-bootstrap';
import { generateID, swagObToJSON } from '../utils/functions';
import Parameters from './Parameters';
import jsonString from 'json-string';

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
          <h5>URL Parameters</h5>
          <Parameters parameters={urlParams} type={false} />
        </div>
      );
    }

    if(bodyParams){
      bodyParamsOutput = (
        <div>
          <h5>Parameters</h5>
          <Parameters parameters={bodyParams} />
        </div>
      );
    }

    // Need to generate the json response output from the json object here
    // so I can use it later.
    let responsesOutput = action.responses.map((response) => {
      return (
        <div key={response.status}>
          <h4>{response.name}</h4>
          <h5>Status Code: {response.status}</h5>
          <h5>Fields:</h5>
          <h5>Example</h5>
          <pre>
            {`${jsonString(swagObToJSON(response.body))}`}
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
        <h5>Responses</h5>
        <div>
          {responsesOutput}
        </div>
      </div>
    );
  }
};
export default Action;
