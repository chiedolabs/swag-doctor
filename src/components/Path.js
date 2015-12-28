import React, {Component, PropTypes} from 'react';
import Actions from './Actions';
import { generateID } from '../utils/functions';

class Path extends Component{

  static propTypes = {
    path: PropTypes.object,
  };

  render(){
    const { path } = this.props;

    return (
      <div key={path.route}>
        <h2 id={`${generateID(path.route)}`} className="url-path">{path.route}</h2>
        <Actions actions={path.actions} />
      </div>
    );
  }
};
export default Path;
