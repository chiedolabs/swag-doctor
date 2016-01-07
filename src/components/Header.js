import React, {Component, PropTypes} from 'react';
import { Table } from 'react-bootstrap';

class Header extends Component{

  static propTypes = {
    header: PropTypes.object,
  };

  render(){
    const { header } = this.props;
    let headerDescriptionOutput;

    if(header.description) {
      headerDescriptionOutput = (
        <div dangerouslySetInnerHTML={{__html: header.description}} />
      );
    }

    let exampleOutput;
    if (header.resolve) {
      let resolve;
      if(typeof header.resolve === 'function') {
        resolve = header.resolve();
      } else {
        resolve = header.resolve;
      }

      exampleOutput = (
        <div>
          <h5>Example:</h5>
          <pre className="prettyprint">
            <strong>{header.key}:</strong> {resolve}
          </pre>
        </div>
      );

    }

    return (
      <div>
        <h4>{header.key}</h4>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Key</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{header.key}</td>
              <td>{headerDescriptionOutput}</td>
            </tr>
          </tbody>
        </Table>
        {exampleOutput}
      </div>
    );
  }
};
export default Header;
