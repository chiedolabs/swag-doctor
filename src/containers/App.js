import React, {Component} from 'react';
import Main from '../components/Main';
import SideNav from '../components/SideNav';
import { Col, Row, Grid } from 'react-bootstrap';

let data;
// In development, load with commonjs for hot reloading benefits
if(process.env.NODE_ENV === 'development') {
  data = require('../../examples/advanced');
} else {
  data = window.docDocGooseData;
}

class App extends Component{
  render(){
    return (
      <Grid className="pull-left">
        <Row className="main">
          <Col xs={3} md={3} className="side-nav">
            <SideNav paths={data.paths} />
          </Col>
          <Col xs={9} md={9} className="viewer">
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <Main paths={data.paths} />
          </Col>
        </Row>
      </Grid>
    );
  }
};
export default App;
