import React, {Component, PropTypes} from 'react';
import { Button, Panel } from 'react-bootstrap';
import { generateID, modelToJSON } from '../utils/functions';
import Parameters from './Parameters';
import Headers from './Headers';
import Fields from './Fields';
import jsonString from 'json-string';
import * as _ from 'lodash';
import Responses from './Responses';
import ob from 'objob';

class Action extends Component{

  static propTypes = {
    action: PropTypes.object,
    route: PropTypes.string,
  };

  render(){
    const { action, route } = this.props;

    let bodyParams;
    let urlParams;
    let queryParams;
    let bodyParamsOutput;
    let urlParamsOutput;
    let queryParamsOutput;
    let descriptionOutput;
    let headersOutput;

    if(action.headers) {
      headersOutput = (
        <Headers headers={action.headers} />
      );
    }

    if(action.params){
      if(action.params.body) {
        bodyParams = action.params.body;
      }

      if(action.params.url) {
        urlParams = action.params.url;
      }

      if(action.params.query) {
        queryParams = action.params.query;
      }
    }

    if(urlParams){
      urlParamsOutput = (
        <div>
          <h4>URL Parameters</h4>
          <Parameters parameters={urlParams} displayTypes={false} />
        </div>
      );
    }

    if(queryParams){
      queryParamsOutput = (
        <div>
          <h4>Query Parameters</h4>
          <Parameters parameters={queryParams} displayTypes={false} />
        </div>
      );
    }

    if(_.isObject(bodyParams)){
      let flatFields = ob.flatten(modelToJSON(bodyParams));
      let flatFieldsWithoutArrays = {};
      // We need to get rid of the array details before passing it to the
      // fields component
      for(let key in flatFields) {
        let originalKey = key;
        key = key.replace(/(\.\d$)/, '');
        key = key.replace(/(\.\d\.)/, '.');
        flatFieldsWithoutArrays[key] = flatFields[originalKey];
      }

      bodyParamsOutput = (
        <div>
          <h4>Body Parameters:</h4>
          <Fields sourceObject={bodyParams} fields={flatFieldsWithoutArrays} />
        </div>
      );
    }

    if(action.description) {
      descriptionOutput = (
        <div dangerouslySetInnerHTML={{__html: action.description}} />
      );
    }

    // Need to generate the json response output from the json object here
    // so I can use it later.
    let responsesOutput;
    if(action.responses) {
      responsesOutput = (
        <Responses responses={action.responses} />
      );
    }

    let condHeadersOutput;
    if(headersOutput) {
      condHeadersOutput = (
        <div>
          <h4>Headers</h4>
          {headersOutput}
          <br/>
        </div>
      );
    }

    let condDescriptionOutput;
    if(descriptionOutput) {
      condDescriptionOutput = (
        <div>
          {descriptionOutput}
        </div>
      );
    }

    return (
      <div>
        <Button bsStyle="success" className="pull-left">{action.method}</Button>
        <h3 id={`${generateID(route+action.name)}`}>
          &nbsp;{action.name}
        </h3>
        <br/>
        {condDescriptionOutput}
        {condHeadersOutput}
        {urlParamsOutput}
        {queryParamsOutput}
        {bodyParamsOutput}
        <div>
          {responsesOutput}
        </div>
      </div>
    );
  }
};
export default Action;
