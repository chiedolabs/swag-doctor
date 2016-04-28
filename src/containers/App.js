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
let date;
// In development, load with commonjs for hot reloading benefits
if(process.env.NODE_ENV === 'development') {
  data = require('../../examples/advanced');
  date = new Date('0000000000').toString();
} else {
  data = window.swagDocData;
  date = new Date(data.timestamp).toString();
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
        <Panel><div dangerouslySetInnerHTML={{__html: data.description}} /></Panel>
      );
    }
    let sideNavClass = classNames({
      'side-nav': true,
      'hide-side-nav': this.state.hideSideNav,
    });

    // First get the keys for all the groups which is what is at the top level
    // of the paths object
    let groups = Object.keys(data.groups);
    // Using those groups, get the paths for each group
    let sideNavs = groups.map((group) => {
      return (
        <Panel header={group} key={groups.indexOf(group)} eventKey={groups.indexOf(group)} bsStyle="primary">
          <SideNav paths={data.groups[group].paths} toggleSideNav={this.handleToggle} />
        </Panel>
      );
    });

    let mainContents = groups.map((group) => {

      let descriptionOutput;
      if(data.description) {
        descriptionOutput = (
          <Panel><div dangerouslySetInnerHTML={{__html: data.groups[group].description}} /></Panel>
        );
      }

      return (
        <div key={groups.indexOf(group)}>
          <Panel header={group} bsStyle="primary">
            {descriptionOutput}
            <Main paths={data.groups[group].paths}/>
          </Panel>
        </div>
      );
    });


    return (
      <div>
        <NavToggle toggleSideNav={this.handleToggle} hideSideNav={this.state.hideSideNav} />
        <Grid className="pull-left">
          <Row className="main">
            <Col xs={3} md={3} className={sideNavClass}>
              <Accordion className="side-nav-accordion" bsStyle="primary">
                {sideNavs}
              </Accordion>
            </Col>
            <Col xs={9} md={9} className="viewer">
              <h1>{data.name}</h1>
              <div>
                {descriptionOutput}
              </div>
              <br/>
              <Panel id="global-responses" header="Global Responses" bsStyle="primary">
                <Responses responses={data.globalResponses} />
              </Panel>
              {mainContents}

              <hr/>
              <b>API documentation generated with <a href="https://github.com/chiedolabs/swag-doctor" target="_blank">Swag Doctor</a> v{data.version} on {date}. Enjoy the swag.</b>
              <br/>
              <br/>
            </Col>
          </Row>
        </Grid>
        <BackToTop />
      </div>
    );
  }
};
export default App;
