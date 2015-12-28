import React, {Component, PropTypes} from 'react';
import { Button } from 'react-bootstrap';
import { generateID } from '../utils/functions';

class Action extends Component{

  static propTypes = {
    action: PropTypes.object,
  };

  render(){
    const { action } = this.props;

    return (
      <div>
        <Button bsStyle="success" className="pull-left">{action.method}</Button>
        <h3 id={`${generateID(action.name)}`}>
          &nbsp;{action.name}
        </h3>
        <div>
          <br/>
          <h4>URL Parameters</h4>
          <h4>Parameters</h4>
          {JSON.stringify(action.params)}
        </div>
      </div>
    );
  }
};
export default Action;
