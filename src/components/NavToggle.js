import React, { Component, PropTypes } from 'react';
let FontAwesome = require('react-fontawesome');

class NavToggle extends Component{

  static propTypes = {
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
    return(
      <div>
        <div className="nav-toggle" onClick={this.handleClick}>
          <FontAwesome name="bars" />
        </div>
      </div>
    );
  };
};
export default NavToggle;