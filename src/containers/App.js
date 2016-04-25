import React, {Component} from 'react';
import Main from '../components/Main';
import NavToggle from '../components/NavToggle';
import SideNav from '../components/SideNav';
import { Col, Row, Grid, Nav } from 'react-bootstrap';
import deepFreeze from 'deep-freeze';
import Responses from '../components/Responses';
let BackToTop = require('pui-react-back-to-top').BackToTop;
let classNames = require('classnames');

let data;
// In development, load with commonjs for hot reloading benefits
if(process.env.NODE_ENV === 'development') {
  data = require('../../examples/advanced');
  data.timestamp = Date.now();
  data.version = 'Dev';
} else {
  data = window.swagDocData;
}

// Make sure data does not get mutated
data = deepFreeze(data);

class App extends Component{
  constructor() {
    super();

    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      hideSideNav: true,
    };
  }

  handleToggle(val) {
    this.setState({
      hideSideNav: val,
    });
  }

  render(){
    let descriptionOutput;
    if(data.description) {
      descriptionOutput = (
        <div dangerouslySetInnerHTML={{__html: data.description}} />
      );
    }
    let sideNavClass = classNames({
      'side-nav': true,
      'hide-side-nav': this.state.hideSideNav,
    });
    return (
      <div>
        <NavToggle toggleSideNav={this.handleToggle} hideSideNav={this.state.hideSideNav} />
        <Grid className="pull-left">
          <Row className="main">
            <Col xs={3} md={3} className={sideNavClass}>
              <SideNav paths={data.paths} toggleSideNav={this.handleToggle} />
            </Col>
            <Col xs={9} md={9} className="viewer">
              <h1>{data.name}</h1>
              <div>
                {descriptionOutput}
              </div>
              <h2 id="global-responses" className="url-path">Global Responses</h2>
              <Responses responses={data.globalResponses} />
              <Main paths={data.paths} version={data.version} timestamp={data.timestamp} />
            </Col>
          </Row>
        </Grid>
        <BackToTop />
      </div>
    );
  }
};
export default App;
