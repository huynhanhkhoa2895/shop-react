import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart,faSearch,faUser } from '@fortawesome/free-solid-svg-icons'
class Header extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        menus : [],
        sticky : 0
      };
    }
    componentDidMount() {
      this.setState({sticky : document.getElementById("navbar").offsetTop})
      this.onSticky();
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
    onSticky(){
      window.onscroll = () => {this.sticky()};
    }
    sticky() {
      if (window.pageYOffset > this.state.sticky) {
        document.getElementById("navbar").classList.add("sticky")
      } else {
        document.getElementById("navbar").classList.remove("sticky");
      }
    }
    render() {
        return (
            <header id="navbar">
              <div className="header-container">
                <ul className="header-list left">
                  {this.state.menus}
                </ul>
                <ul className="right">
                  <li style={{marginRight : "20px"}}><FontAwesomeIcon icon={faSearch} color="#fff"/></li>
                  <li style={{marginRight : "20px"}}><FontAwesomeIcon icon={faShoppingCart} color="#fff"/></li>
                  <li style={{marginRight : "20px"}}><FontAwesomeIcon icon={faUser} color="#fff"/></li>
                </ul>
              </div>
            </header>
        );
      }
}

export default Header;
