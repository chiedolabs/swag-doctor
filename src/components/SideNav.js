import React, {Component, PropTypes} from 'react';
import * as _ from 'lodash';
import { Nav, NavItem, Row } from 'react-bootstrap';
import { generateID } from '../utils/functions';

class SideNav extends Component{

  static propTypes = {
    paths: PropTypes.object,
    toggleSideNav: PropTypes.func,
    hideSideNav: PropTypes.bool,
  };

  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick() {
    let toggle = !this.props.hideSideNav;
    this.props.toggleSideNav(toggle);
  };

  render(){
    const { paths } = this.props;

    let routes = Object.keys(paths);

    let sidenavOutput = _.map(routes, (route) => {
      let subnavOutput = _.map(paths[route].actions, (action) => {
        return (
          <NavItem key={action.name} href={`#${generateID(route+action.name)}`} >
            {action.name}
          </NavItem>
        );
      });

      return (
        <Nav stacked key={route} onClick={this.handleClick}>
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
