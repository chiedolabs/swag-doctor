import React, {Component, PropTypes} from 'react';
import * as _ from 'lodash';
import Path from './Path';
import ob from 'objob';

class Main extends Component{

  static propTypes = {
    paths: PropTypes.object,
  };

  render(){
    const { paths } = this.props;
    let routes = ob.keys(paths);
    let pathsOutput = _.map(routes, (route) => {
      return (
        <Path key={route} path={paths[route]} route={route} />
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
