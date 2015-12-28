import React, {Component, PropTypes} from 'react';
import * as _ from 'lodash';

class Paths extends Component{

  static propTypes = {
    paths: PropTypes.array,
  };

  render(){
    const { paths } = this.props;

    let pathsOutput = _.map(paths, (path) => {
      return <div key={path.route}>{path.route}</div>;
    });

    return (
      <div>
        {pathsOutput}
      </div>
    );
  }
};
export default Paths;
