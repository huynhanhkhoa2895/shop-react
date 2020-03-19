import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart,faSearch,faUser } from '@fortawesome/free-solid-svg-icons'
import MinicartItem from '../../Widget/Minicart/MinicartItem'
import {connect} from 'react-redux';
import $ from 'jquery'
class Header extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        menus : [],
        sticky : 0,
        templateMinicart : null,  
        popup : true,
        carts : null,
        input : {}
      };
      this.setTemplateMinicart = this.setTemplateMinicart.bind(this)
      this.removeItemInCart = this.removeItemInCart.bind(this)
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
    setTemplateMinicart(){
      if($.isEmptyObject(this.props.carts)){
        return <div style={{marginTop : "100px", textAlign : "center"}}><span className="colorGrey f20">Không Có Sản Phẩm Nào</span></div>
      }else{
        let xhtml = [];
        xhtml.splice(0)
        console.log(this.props.carts);
        this.props.carts.forEach((e,key)=>
          {
            xhtml.push(
              <MinicartItem key={key} info={e} removeItemInCart={this.removeItemInCart}/>
            )
          }
        )
        return xhtml;
      }
    }

    render() {
      let {carts} = this.props;
      return (
          <header id="navbar">
            <div className="header-container">
              <ul className="header-list left">
                {this.state.menus}
              </ul>
              <ul className="header-list right">
                <li style={{marginRight : "20px",cursor : "pointer"}}><FontAwesomeIcon icon={faSearch} color="#fff"/></li>
                <li style={{marginRight : "20px", position : 'relative'}} >
                  <FontAwesomeIcon icon={faShoppingCart} color="#fff" onClick={this.openMiniCart.bind(this)} style={{cursor : "pointer"}}/>
                  <div className="minicart" style={{display : this.props.minicart.openPopup ? 'block' : 'none'}}>
                    <div className="minicart-product">
                      {this.setTemplateMinicart(carts)}
                    </div>
                    <div className="minicart-info"></div>
                  </div>
                </li>
                <li style={{marginRight : "20px",cursor : "pointer"}}><FontAwesomeIcon icon={faUser} color="#fff"/></li>
              </ul>
            </div>
          </header>
      );
      }
}
const mapStateToProps = state => {
  return {
    carts: state.carts,
    minicart: state.minicart
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
      }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);

