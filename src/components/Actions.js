import React, {Component, PropTypes} from 'react';
import * as _ from 'lodash';

class Actions extends Component{

  static propTypes = {
    actions: PropTypes.array,
  };

  render(){
    const { actions } = this.props;

    let actionsOutput = _.map(actions, (action) => {
      return <div key={action.name}>{action.name}</div>;
    });

    return (
      <div>
        {actionsOutput}
      </div>
    );
  }
};
export default Actions;
