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
    if (header.example) {
      let example;
      if(typeof header.example === 'function') {
        example = header.example();
      } else {
        example = header.example;
      }

      exampleOutput = (
        <div>
          <h6>Example:</h6>
          <pre className="prettyprint">
            <strong>{header.key}:</strong> {example}
          </pre>
        </div>
      );

    }

    return (
      <div>
        <h5>{header.key}</h5>
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
