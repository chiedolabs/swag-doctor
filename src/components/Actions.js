import React, {Component, PropTypes} from 'react';
import * as _ from 'lodash';
import Action from './Action';

class Actions extends Component{

  static propTypes = {
    actions: PropTypes.array,
  };

  render(){
    const { actions } = this.props;

    let actionsOutput = _.map(actions, (action) => {
      return <Action key={action.name} action={action} />;
    });

    return (
      <div>
        {actionsOutput}
      </div>
    );
  }
};
export default Actions;
