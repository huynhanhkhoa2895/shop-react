import React from 'react';
import './AddToCart.css';
import { connect } from 'react-redux';
import {header} from '../Header/Header'
import $ from 'jquery'
class AddToCart extends React.Component {
    constructor(props){        
        super(props);
        this.AddCart = this.AddCart.bind(this)
    }
    AddCart(){
        this.props.AddCart({product : this.props.product,qty : this.props.qty})
        header.openMiniCart();        
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