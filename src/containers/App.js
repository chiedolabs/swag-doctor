import React, {Component} from 'react';
import Paths from '../components/Paths';
import SideNav from '../components/SideNav';
import { Col, Row, Grid } from 'react-bootstrap';

let data = window.docDocGooseData;

class App extends Component{
  render(){
    return (
      <Grid>
        <Row className="main">
          <Col xs={3} md={3} className="side-nav">
            <SideNav paths={data.paths} />
          </Col>
          <Col xs={9} md={9}>
            <Paths paths={data.paths} />
          </Col>
        </Row>
      </Grid>
    );
  }
};
export default App;
