import React from 'react';
import './Header.css';
import { Link, NavLink } from 'react-router-dom';
class Header extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        menus : [],
      };
    }
    componentDidMount() {
        fetch("http://127.0.0.1:3000/api/v1/getHeaderMenu")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                menus : result.map((item,index)=>
                  <li key={index}><NavLink to={"category/"+item.route}>{item.name}</NavLink></li>
                )
              })
            },
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
              <div className="header-container">
                <ul className="header-list">
                  {this.state.menus}
                </ul>
              </div>
            </header>
        );
      }
}

export default Header;
