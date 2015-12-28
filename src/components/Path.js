import React, {Component, PropTypes} from 'react';
import Actions from './Actions';

class Path extends Component{

  static propTypes = {
    path: PropTypes.object,
  };

  render(){
    const { path } = this.props;

    return (
      <div key={path.route}>
        <h1>{path.route}</h1>
        <Actions actions={path.actions} />
      </div>
    );
  }
};
export default Path;
