import React, {Component, PropTypes} from 'react';
import * as _ from 'lodash';
import Actions from './Actions';

class Paths extends Component{

  static propTypes = {
    paths: PropTypes.array,
  };

  render(){
    const { paths } = this.props;

    let pathsOutput = _.map(paths, (path) => {
      return (
        <div key={path.route}>
          <h1>{path.route}</h1>
          <Actions actions={path.actions} />
        </div>
      );
    });

    return (
      <div>
        {pathsOutput}
      </div>
    );
  }
};
export default Paths;
