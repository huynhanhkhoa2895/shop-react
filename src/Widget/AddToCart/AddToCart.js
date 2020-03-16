import React from 'react';
import './AddToCart.css';
import { connect } from 'react-redux';
import $ from 'jquery'
class AddToCart extends React.Component {
    constructor(props){        
        super(props);
        this.AddCart = this.AddCart.bind(this)
    }
    AddCart(){
        this.props.AddCart({product : this.props.product,qty : this.props.qty})
        // let arr = this.state.cart;
        // if(arr[this.props.product.id] == null){
        //     arr[this.props.product.id] = {};
        //     arr[this.props.product.id]['product'] = this.props.product;
        //     arr[this.props.product.id]['qty'] = this.props.qty;
        // }else{
        //     arr[this.props.product.id]['qty'] = this.props.qty;
        // }
        // this.setState({
        //     cart : arr
        // })
        // setCookie('cart',this.state.cart)
        
    }
    render() {
        return (
            <button className="btn-cart" onClick={()=> this.AddCart()}>Thêm vào giỏ hàng</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);