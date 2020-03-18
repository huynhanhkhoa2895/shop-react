import React from 'react';
import './Header.css';
import { NavLink,Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart,faSearch,faUser,faTrash } from '@fortawesome/free-solid-svg-icons'
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
        input : {}
      };
      this.setTemplateMinicart = this.setTemplateMinicart.bind(this)
      this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
      let arr = {};
      Object.keys(this.props.carts).map((e)=>{
        arr[e] = this.props.carts[e].qty;
      })
      this.setState({
        input : arr
      })
      
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
    handleChange(event) {
      let e = event.target.getAttribute('data-id');  
      let arr = this.state.input;
      arr[e] = event.target.value
      // this.props.carts[e].qty = event.target.value;
      // console.log(event.target.value)
      // console.log(this.props.carts[e].qty)
      this.setState({
        input : arr
      })
    }  
    openMiniCart(){
      this.setState({
        popup : !this.state.popup
      })
      if(!this.state.popup) this.props.closePopup()
      else this.props.openPopup()
    }
    setTemplateMinicart(){
      console.log(this.props.carts);
      if($.isEmptyObject(this.props.carts)){
        return <div style={{marginTop : "100px", textAlign : "center"}}><span className="colorGrey f20">Không Có Sản Phẩm Nào</span></div>
      }else{
        let xhtml = [];
        Object.keys(this.props.carts).map((e,key)=>
          {
            let img = (this.props.carts[e].img == null) ? 'no_image.png' : this.props.carts[e].img[0]
            xhtml.push(
              <div key={key} className="row minicart-box">
                <div className="col-md-6 ">
                  <div className="minicart-img">
                    <img src={window.location.origin+'/product/'+img} alt={this.props.carts[e].product.name} />                  
                  </div>
                </div>
                <div className="col-md-6 minicart-content pd0">
                  <ul>
                    <li><h4><Link  to={"product/"+this.props.carts[e].product.route} className="color">{this.props.carts[e].product.name}</Link></h4></li>
                    <li><span className="colorGrey">Nhãn hiệu : </span>{this.props.carts[e].product.brand_name}</li>
                    <li><span className="colorGrey">Loại : </span>{this.props.carts[e].product.category_name}</li>
                    <li>
                      <div className="row">
                        <div className="col-4" style={{paddingLeft : 0}}><input style={{display: 'block',width: '100%',height: '100%',textAlign: 'center'}} value={this.state.input[e]} pattern="[0-9]*" inputmode="numeric" data-id={e} onChange={this.handleChange}/></div>
                        <div className="col-4 pd0"><button className="background colorW" style={{padding : "5px"}}>Update</button></div>
                        <div className="col-4 text-center" style={{lineHeight : "1.8"}}><FontAwesomeIcon icon={faTrash} className="color"/></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )
          }

        )
        return xhtml;
      }
    }
    render() {
      console.log("componentDidMount",this.state.input)
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
      }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);

