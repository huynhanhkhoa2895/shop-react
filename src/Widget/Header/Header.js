import React from 'react';
import './Header.css';
import { NavLink,Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart,faBars,faUser,faTimes } from '@fortawesome/free-solid-svg-icons'
import MinicartItem from '../../Widget/Minicart/MinicartItem'
import Search from './Search'

import {connect} from 'react-redux';
import $ from 'jquery'
import Helper from '../../lib/Helper'
class Header extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        menus : [],
        menus2 : [],
        sticky : 0,
        templateMinicart : null,  
        popup : true,
        carts : null,
        input : {},
        menuBar: false,
        displayPopupUser : false
      };
      this.setTemplateMinicart = this.setTemplateMinicart.bind(this)
      this.setTemplateMinicartInfo = this.setTemplateMinicartInfo.bind(this)
      this.removeItemInCart = this.removeItemInCart.bind(this);
      this.updateItemInCart = this.updateItemInCart.bind(this);
      this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    componentDidMount() {
      this.setState({sticky : document.getElementById("navbar").offsetTop})
      document.addEventListener('mousedown', this.handleClickOutside);
      this.onSticky();
      fetch(Helper.apiUrl()+"api/v1/getHeaderMenu")
        .then(res => res.json())
        .then(
          (result) => {
            let header = []
            result.map((item,index)=>
                header.push(<li key={index}><NavLink to={"/category/"+item.route}>{item.name}</NavLink></li>)
            )
            this.setState({
              menus : header,
              menus2 : header
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
    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside(event) {
      if($(event.target).closest(".header-is-login").length == 0){
        this.setState({
          displayPopupUser : false
        })
      }
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
      this.setState({
        popup : !this.state.popup
      })
      if(!this.state.popup) this.props.closePopup()
      else this.props.openPopup()
    }
    removeItemInCart(product){
      this.props.removeItemInCart(product);
    }
    updateItemInCart(product,qty){
      this.props.updateItemInCart(product,qty);
    }
    
    setTemplateMinicart(){
      if($.isEmptyObject(this.props.carts)){
        return <div style={{marginTop : "100px", textAlign : "center"}}><span className="colorGrey f20">Không Có Sản Phẩm Nào</span></div>
      }else{
        let xhtml = [];
        xhtml.splice(0)
        this.props.carts.map((e,key)=>
          {
            xhtml.push(
              <MinicartItem key={key} info={e} removeItemInCart={this.removeItemInCart} updateItemInCart={this.updateItemInCart}/>
            )
          }
        )
        return xhtml;
      }
    }
    setTemplateMinicartInfo(){
      let xhtml = [];
      let total = 0;
      if(this.props.carts.length > 0){
        this.props.carts.map((e,key)=>{
          total += e.product.price*e.qty
        })
        xhtml=
          <>
          <div className="row">
            <div className="col-md-6">
              <span class="span-total-header">Tổng cộng ({this.props.carts.length}): </span>
            </div>
            <div className="col-md-6 text-right">{Helper.format_curency(total)} <b>VND</b></div>
          </div>
          <div className="row">
            <div className="col-md-6 offset-md-6">
              <Link to={"/checkout/cart"} className="btn-checkout-minicart text-center">Vào giỏ hàng</Link>
            </div>
          </div>
          </>
        
      }
      return xhtml;
    }
    openUserPopup(){

      this.setState({
        displayPopupUser : !this.state.displayPopupUser
      })
    }
    setTemplateUser(){
      let xhtml = [];
      if(this.props.verify.isLogin){
        xhtml = 
          <li className="relative" style={{marginRight : "20px",cursor : "pointer"}}>
            <div onClick={()=>this.openUserPopup()}>
              <FontAwesomeIcon icon={faUser} color="#fff"/>
            </div>
            <ul className={"header-is-login "+ (this.state.displayPopupUser ? "block" : "none")} >
              <li><Link to={"/customer/info"}>Thông tin cá nhân</Link></li>
              <li><Link to={"/customer/order"}>Lịch sử đơn hàng</Link></li>
              <li><Link to={"/customer/address"}>Sổ địa chỉ</Link></li>
              <hr/>
              <li><Link to={"/customer/logout"}>Đăng xuất</Link></li>
            </ul>
          </li>
      }else{
        xhtml = <li style={{marginRight : "20px",cursor : "pointer"}}><Link to="/customer/login.html" style={{fontSize : '12px'}}><FontAwesomeIcon icon={faUser} color="#fff"/></Link></li>
      }
      return xhtml
    }
    openMenubar(){
      this.setState({
        menuBar : !this.state.menuBar
      })
    }
    render() {
      let {carts} = this.props;
      let {verify} = this.props;
      return (
          <header id="navbar">
            <div className="header-container-desktop">
              <ul className="header-list left">
                <li>
                  <div style={{overflow : "hidden"}}>
                    <NavLink to={"/"}>
                      <img src={"/NL.png"} alt="logo" width="25px"/>
                    </NavLink>
                  </div>
                </li>
                {this.state.menus}
              </ul>
              <ul className="header-list right">
                <li style={{marginRight : "20px",cursor : "pointer"}}>
                  <Search />
                </li>
                <li style={{marginRight : "20px", position : 'relative'}} >
                  <FontAwesomeIcon icon={faShoppingCart} color="#fff" onClick={this.openMiniCart.bind(this)} style={{cursor : "pointer"}}/>
                  <div className="popup-qty">
                    <span className="block">{this.props.carts.length}</span>
                  </div>
                  <div className="minicart" style={{display : this.props.minicart.openPopup ? 'block' : 'none'}}>
                    <div className="minicart-header">
                      <FontAwesomeIcon className="color" icon={faTimes} onClick={this.openMiniCart.bind(this)} style={{cursor : "pointer",display : 'block',fontSize : '18px',marginLeft : 'auto'}}/>                    
                    </div>
                    <div className="minicart-product">
                      {this.setTemplateMinicart(carts)}
                    </div>
                    <div className={(carts.length == 0) ? "minicart-info none" : "minicart-info block"}>
                      {this.setTemplateMinicartInfo(carts)}
                    </div>
                  </div>
                </li>
                {this.setTemplateUser(verify)}
              </ul>
            </div>
            <div className="header-container-mobile">
              <div className="row">
                <div className="col-4">
                  <FontAwesomeIcon onClick={()=>this.openMenubar()} icon={faBars} color="#fff"/>
                </div>
                <div className="col-4">
                  <NavLink to={"/"}>
                    <img src={"/NL.png"} alt="logo" width="35px"/>
                  </NavLink>
                </div>
                <div className="col-4">
                  <FontAwesomeIcon onClick={this.openMiniCart.bind(this)} style={{cursor : "pointer"}} icon={faShoppingCart} color="#fff"/>
                </div>
              </div>
              <div className={"menu-bar "+(this.state.menuBar ? "active" : "")}>
                <ul className="header-list">
                  {this.state.menus2}
                </ul>
              </div>
            </div>
          </header>
      );
      }
}
const mapStateToProps = state => {
  return {
    carts: state.carts,
    minicart: state.minicart,
    verify : state.verify,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      closePopup : ()=>{
        dispatch({type : 'CLOSE_POPUP'})
      },
      openPopup : ()=>{
        dispatch({type : 'OPEN_POPUP'})
      },
      removeItemInCart : (id)=> {
        dispatch({type : 'REMOVE_ITEM_IN_CART',id : id})
      },
      updateItemInCart : (id,qty) => {
        dispatch({type : 'UPDATE_ITEM_IN_CART',id : id,qty : qty})
      }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);

