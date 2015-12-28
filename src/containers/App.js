import React, {Component} from 'react';
import Paths from '../components/Paths';

let data = window.docDocGooseData;

class App extends Component{
  render(){
    return <Paths paths={data.paths} />;
  }
};
export default App;
