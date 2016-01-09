import React, {Component, PropTypes} from 'react';
import * as _ from 'lodash';
import Action from './Action';

class Actions extends Component{

  static propTypes = {
    actions: PropTypes.array,
    route: PropTypes.string,
  };

  render(){
    const { actions, route } = this.props;

    let actionsOutput = _.map(actions, (action) => {
      return <Action key={action.name} action={action} route={route} />;
    });

    return (
      <div>
        {actionsOutput}
      </div>
    );
  }
};
export default Actions;
