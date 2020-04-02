import React from 'react';
import './AddToCart.css';
import { connect } from 'react-redux';
class AddToCart extends React.Component {
    constructor(props){        
        super(props);
        this.AddCart = this.AddCart.bind(this)
    }
    AddCart(){
        this.props.AddCart({product : this.props.product,qty : this.props.qty,img : this.props.img,option : this.props.option})
        this.props.openPopup()
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
            dispatch({type : 'ADD_TO_CART',product}) ;
        },
        openPopup : ()=>{
            dispatch({type : 'OPEN_POPUP'})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);