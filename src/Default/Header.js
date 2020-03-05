import React from 'react';
import '../bootstrap.min.css';

class Header extends React.Component {
    componentDidMount() {
        fetch("http://127.0.0.1:3000/api/v1/getHeaderMenu")
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    
    render() {
        return (
            <header>
                <ul>
                    <li>Test</li>
                    <li>Test2</li>
                </ul>
            </header>
        );
      }
}

export default Header;
