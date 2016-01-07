import React, {Component, PropTypes} from 'react';
import Header from './Header';

class Headers extends Component{

  static propTypes = {
    headers: PropTypes.array,
  };

  render(){
    const {headers} = this.props;

    let headersOutput = headers.map((header) => {
      return (
        <Header header={header} key={headers.indexOf(header)} />
      );
    });

    return (
      <div>
        {headersOutput}
      </div>
    );
  }
};
export default Headers;
