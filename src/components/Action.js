import React, {Component, PropTypes} from 'react';
import { Button } from 'react-bootstrap';
import { generateID } from '../utils/functions';
import Parameters from './Parameters';

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
          <h4>Parameters</h4>
          <Parameters parameters={bodyParams} />
        </div>
      );
    }

    return (
      <div>
        <Button bsStyle="success" className="pull-left">{action.method}</Button>
        <h3 id={`${generateID(action.name)}`}>
          &nbsp;{action.name}
        </h3>
        <br/>
        {urlParamsOutput}
        {bodyParamsOutput}
      </div>
    );
  }
};
export default Action;