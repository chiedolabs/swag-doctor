import React, {Component, PropTypes} from 'react';
import Actions from './Actions';
import { generateID } from '../utils/functions';
import { Panel } from 'react-bootstrap';

class Path extends Component{

  static propTypes = {
    path: PropTypes.object,
    route: PropTypes.string,
  };

  render(){
    const { path, route } = this.props;
    let descriptionOutput;

    if(path.description) {
      descriptionOutput = (
        <Panel><div dangerouslySetInnerHTML={{__html: path.description}} /></Panel>
      );
    }

    return (
      <div>
        <h2 id={`${generateID(route)}`} className="url-path">{route}</h2>
        {descriptionOutput}
        <Actions actions={path.actions} route={route} />
      </div>
    );
  }
};
export default Path;
