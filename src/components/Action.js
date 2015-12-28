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
        <Button bsStyle="success">{action.method}</Button>
        <div id={`${generateID(action.name)}`}>
          {action.name}
        </div>
      </div>
    );
  }
};
export default Action;
