import React, {Component, PropTypes} from 'react';
import * as _ from 'lodash';
import Path from './Path';
class Main extends Component{

  static propTypes = {
    paths: PropTypes.object,
  };

  render(){
    const { paths } = this.props;
    let routes = Object.keys(paths);
    let pathsOutput = _.map(routes, (route) => {
      return (
        <div key={route}>
          <Path path={paths[route]} route={route} />
          <br/>
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
export default Main;
