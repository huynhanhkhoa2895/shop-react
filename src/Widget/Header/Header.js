import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart,faSearch,faUser } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
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
      console.log("openMiniCart",this.props.cart)
    }
    templateMinicart(){
      if($.isEmptyObject(this.state.cart)){
        this.setState({
          templateMinicart : <div style={{marginTop : "100px", textAlign : "center"}}><span className="colorGrey f20">Không Có Sản Phẩm Nào</span></div>
        })
      }else{
        let xhtml = [];
        Object.keys(this.state.cart).map((e,key)=>
          xhtml.push(<p key={key}>{this.state.cart[e].product.id} : {this.state.cart[e].product.name} ({this.state.cart[e].qty})</p>)
        )
        console.log(xhtml)
        this.setState({
          templateMinicart : xhtml
        })
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
                  <li style={{marginRight : "20px", position : 'relative'}} onClick={this.openMiniCart.bind(this)}>
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
const mapStateToProps = state => {
  return {
      carts: state.carts
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    AddCart: (product) => {
        dispatch({type : 'BUY_PRODUCT',product}) ;
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);

