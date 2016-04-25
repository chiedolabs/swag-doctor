import React, {Component} from 'react';
import Main from '../components/Main';
import NavToggle from '../components/NavToggle';
import SideNav from '../components/SideNav';
import { Col, Row, Grid, Accordion, Panel } from 'react-bootstrap';
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

    // First get the keys for all the groups which is what is at the top level
    // of the paths object
    let groups = Object.keys(data.paths);
    // Using those groups, get the paths for each group
    let sideNavs = groups.map((group) => {
      return (
        <Panel header={group} key={groups.indexOf(group)} eventKey={groups.indexOf(group)}>
          <SideNav paths={data.paths[group]} toggleSideNav={this.handleToggle} />
        </Panel>
      );
    });

    let mainContents = groups.map((group) => {
      return (
        <Main paths={data.paths[group]} version={data.version} timestamp={data.timestamp} key={groups.indexOf(group)}/>
      );
    });


    return (
      <div>
        <NavToggle toggleSideNav={this.handleToggle} hideSideNav={this.state.hideSideNav} />
        <Grid className="pull-left">
          <Row className="main">
            <Col xs={3} md={3} className={sideNavClass}>
              <Accordion className="side-nav-accordion">
                {sideNavs}
              </Accordion>
            </Col>
            <Col xs={9} md={9} className="viewer">
              <h1>{data.name}</h1>
              <div>
                {descriptionOutput}
              </div>
              <h2 id="global-responses" className="url-path">Global Responses</h2>
              <Responses responses={data.globalResponses} />
              {mainContents}
            </Col>
          </Row>
        </Grid>
        <BackToTop />
      </div>
    );
  }
};
export default App;
