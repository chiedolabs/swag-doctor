import React, {Component, PropTypes} from 'react';
import * as _ from 'lodash';
import Path from './Path';

class Main extends Component{

  static propTypes = {
    paths: PropTypes.array,
  };

  render(){
    const { paths } = this.props;

    let pathsOutput = _.map(paths, (path) => {
      return (
        <Path key={path.route} path={path} />
      );
    });

    return (
      <div>
        {pathsOutput}
      </div>
    );
  }
};
export default Main;
