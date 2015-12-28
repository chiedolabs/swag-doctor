
import React, {Component, PropTypes} from 'react';
import * as _ from 'lodash';
import { Nav, NavItem } from 'react-bootstrap';

class SubNav extends Component{

  static propTypes = {
    actions: PropTypes.array,
  };

  render(){
    const { actions } = this.props;

    let navOutput = _.map(actions, (action) => {
      return (
        <NavItem key={action.name}>
          {action.name}
        </NavItem>
      );
    });

    return (
      <Nav>
        {navOutput}
      </Nav>
    );
  }
};
export default SubNav;
