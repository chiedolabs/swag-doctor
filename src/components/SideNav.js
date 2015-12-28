import React, {Component, PropTypes} from 'react';
import * as _ from 'lodash';
import { Nav, NavItem, Row } from 'react-bootstrap';

class SideNav extends Component{

  static propTypes = {
    paths: PropTypes.array,
  };

  render(){
    const { paths } = this.props;

    let sidenavOutput = _.map(paths, (path) => {
      let subnavOutput = _.map(path.actions, (action) => {
        return (
          <NavItem key={action.name}>
            {action.name}
          </NavItem>
        );
      });

      return (
        <Nav stacked key={path.route}>
          <NavItem className="nav-header">
            {path.route}
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
