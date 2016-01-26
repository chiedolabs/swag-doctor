import React, {Component, PropTypes} from 'react';
import * as _ from 'lodash';
import Path from './Path';
class Main extends Component{

  static propTypes = {
    paths: PropTypes.object,
    timestamp: PropTypes.number,
    version: PropTypes.string,
  };

  render(){
    const { paths, timestamp, version } = this.props;
    let routes = Object.keys(paths);
    let pathsOutput = _.map(routes, (route) => {
      return (
        <Path key={route} path={paths[route]} route={route} />
      );
    });
    let date = new Date(timestamp).toString();
    return (
      <div>
        {pathsOutput}

        <hr/>
        <b>API documentation generated with <a href="https://github.com/chiedolabs/swag-doctor" target="_blank">Swag Doctor</a> v{version} on {date}. Enjoy the swag.</b>
        <br/>
        <br/>
      </div>
    );
  }
};
export default Main;
