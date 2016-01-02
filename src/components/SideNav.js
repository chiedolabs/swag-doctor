import React, {Component, PropTypes} from 'react';
import * as _ from 'lodash';
import { Nav, NavItem, Row } from 'react-bootstrap';
import { generateID } from '../utils/functions';
import ob from 'objob';

class SideNav extends Component{

  static propTypes = {
    paths: PropTypes.object,
  };

  render(){
    const { paths } = this.props;

    let routes = ob.keys(paths);

    let sidenavOutput = _.map(routes, (route) => {
      let subnavOutput = _.map(paths[route].actions, (action) => {
        return (
          <NavItem key={action.name} href={`#${generateID(action.name)}`}>
            {action.name}
          </NavItem>
        );
      });

      return (
        <Nav stacked key={route}>
          <NavItem href={`#${generateID(route)}`} className="nav-header">
            {route}
          </NavItem>
          {subnavOutput}
        </Nav>
      );
    });

    return (
      <Row>
        {sidenavOutput}
      </Row>
    );
  }
};
export default SideNav;
