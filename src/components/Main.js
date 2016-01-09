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
        <Path key={route} path={paths[route]} route={route} />
      );
    });

    return (
      <div>
        {pathsOutput}

        <hr/>
        <b>API documentation generated with <a href="https://github.com/chiedolabs/swag-doctor" target="_blank">Swag Doctor</a></b>
        <br/>
        <br/>
      </div>
    );
  }
};
export default Main;
