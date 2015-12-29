import React, {Component, PropTypes} from 'react';
import Actions from './Actions';
import { generateID } from '../utils/functions';

class Path extends Component{

  static propTypes = {
    path: PropTypes.object,
    route: PropTypes.string,
  };

  render(){
    const { path, route } = this.props;

    return (
      <div>
        <h2 id={`${generateID(route)}`} className="url-path">{route}</h2>
        <Actions actions={path.actions} />
      </div>
    );
  }
};
export default Path;
