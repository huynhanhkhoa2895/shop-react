import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart,faSearch,faUser } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery'
class Header extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        menus : [],
        sticky : 0,
        cart : this.props.cart,
        templateMinicart : '',
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
      this.templateMinicart();
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
    openMiniCart(){

    }
    templateMinicart(){
      if($.isEmptyObject(this.state.cart)){
        this.setState({
          templateMinicart : <div style={{marginTop : "100px", textAlign : "center"}}><span className="colorGrey f20">Không Có Sản Phẩm Nào</span></div>
        })
      }else{

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
                  <li style={{marginRight : "20px", position : 'relative'}} onClick={this.openMiniCart}>
                    <FontAwesomeIcon icon={faShoppingCart} color="#fff"/>
                    <div className="minicart">
                      {this.state.templateMinicart}
                    </div>
                  </li>
                  <li style={{marginRight : "20px"}}><FontAwesomeIcon icon={faUser} color="#fff"/></li>
                </ul>
              </div>
            </header>
        );
      }
}

export default Header;
