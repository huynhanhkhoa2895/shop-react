import React from 'react';
import $ from 'jquery';
import CartItem from './CartItem';
import {connect} from 'react-redux';
import {setCookie,getCookie} from '../../Widget/Cookie/Cookie.js'
import { Link } from 'react-router-dom';
import Helpers from '../../lib/Helper';
class Cart extends React.Component {
    constructor(props){ 
        const customer = getCookie("customer");       
        super(props);
        this.state = {
            cart : this.props.carts,
            xhtml_cart : [],
            isAccept : false,
            errorMessage : false,
            customer : customer == null ? null : customer
        }
        console.log(customer);
        if(getCookie('cart') == null || $.isEmptyObject(getCookie('cart')) || this.state.cart.length == 0){
            this.props.history.push('/')
        }
        this.setCartItem = this.setCartItem.bind(this)
        this.removeItemInCart = this.removeItemInCart.bind(this);
        this.updateItemInCart = this.updateItemInCart.bind(this);
        this.AcceptPrivacy = this.AcceptPrivacy.bind(this);
        this.goToPayment = this.goToPayment.bind(this)
    }
    componentDidMount() {
        // this.setCartItem();
        this.props.closePopup();
    }
    async removeItemInCart(product){
        await this.props.removeItemInCart(product);
        if(this.props.carts == null || this.props.carts.length == 0){
            this.props.history.push('/')
        }
    }
    updateItemInCart(product,qty){
        this.props.updateItemInCart(product,qty);
    }
    setCartItem(){
        let cart = [];
        cart.splice(0)
        this.props.carts.map((e,k)=>{
            cart.push(<CartItem removeItemInCart={this.removeItemInCart} updateItemInCart={this.updateItemInCart} key={k+"_cart_item"} cart={e} />);
        })
        return cart
    }
    AcceptPrivacy(event){
        this.setState({
            isAccept : !this.state.isAccept
        })
    }
    goToPayment(){
        if(this.state.isAccept){

            if(this.state.customer == null){
                setCookie("error_login",JSON.stringify({redirect : '/checkout/payment',msg : "Bạn phải đăng nhập để tiếp tục mua hàng"}))
                this.props.history.push('/customer/login.html')
            }else{
                this.props.history.push('/checkout/payment')
            }
            
        }
        else {
            $(".alert-message").addClass("error")
            this.setState({
                errorMessage : true 
            })
        }
    }
    render(){
        let {carts} = this.props;
        let t = 0;
        this.props.carts.map((e)=>{
            t += e.product.price*e.qty
        })
        return(
            <div className="container-fluid">
                <div className="row w100">
                    <div className="col-12">
                        <h3 className="ls01 colorGrey text-center">Giỏ Hàng ({this.props.carts.length} sản phẩm)</h3>
                    </div>
                </div>
                <div className="row w100">
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-12">
                                <table className="table">
                                    <tbody>
                                        {this.setCartItem(carts)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="box-info-price">
                            <div className="row " style={{marginBottom : "20px"}}>
                                <div className="col f18">Tạm tính: </div>
                                <div className="col f18 text-right">{Helpers.format_curency(t)} VND</div>
                            </div>
                            <div className="row ">
                                <div className="col f18" style={{marginBottom : "20px"}}>Tổng tính: </div>
                                <div className="col f18 color text-right">{Helpers.format_curency(t)} VND</div>
                            </div>
                            <div className="row " style={{marginBottom : "20px"}}>
                                <div className="col f12">
                                    <div className="form-group">
                                        <div className="left" style={{paddingTop : 3,marginRight : 10}}>
                                            <input type="checkbox" defaultChecked={this.state.isAccept} name="privacy" onChange={this.AcceptPrivacy}/>
                                        </div>
                                        <div className="left alert-message ">
                                            <div>Tôi đã đọc và hiểu với <Link to="/privacy-policy">chính sách</Link> của shop*</div>
                                            <div className={this.state.errorMessage ? 'block' : 'none'}><small>Bạn phải hoàn thành phần này</small></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col f12">
                                    <button to="/checkout/payment" onClick={this.goToPayment} className="block w100 background f16 text-center" style={{padding : 10,color : "#fff",}}>Thanh toán</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
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
        removeItemInCart : (id)=> {
            dispatch({type : 'REMOVE_ITEM_IN_CART',id : id})
        },
        updateItemInCart : (id,qty) => {
            dispatch({type : 'UPDATE_ITEM_IN_CART',id : id,qty : qty})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
