import React, {Component, PropTypes} from 'react';
import * as _ from 'lodash';
import { Nav, NavItem } from 'react-bootstrap';
import SubNav from './SubNav';

class SideNav extends Component{

  static propTypes = {
    paths: PropTypes.array,
  };

  render(){
    const { paths } = this.props;

    let sidenavOutput = _.map(paths, (path) => {
      return (
      <Nav bsStyle="pills" stacked key={path.route}>
        <NavItem className="nav-header">
          {path.route}
        </NavItem>
        <SubNav actions={path.actions} />
      </Nav>
      );
    });

    return (
      <div>
        {sidenavOutput}
      </div>
    );
  }
};
export default SideNav;
