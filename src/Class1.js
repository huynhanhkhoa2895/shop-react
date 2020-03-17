import React from 'react';
import {connect} from 'react-redux';
import {actAddToCart,updateQtyInCart} from './reducer/actions'
class Class1 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value : "Class",
            cart : 1,
        }
    }
    getCart(){
        console.log("CART");
    }
    addCart(){
        console.log("Add CART");
        this.props.addCartInRedux({id : 1,qty : 5});
        this.props.getCart();
        this.props.openPopup();
        this.setState({
            cart : this.state.cart++,
        })
    }
    render() {
        return (
            <div className="row">
                <div className="col-6"><button className="btn btn-success" onClick={this.addCart.bind(this)}>CLICK</button></div>
                <div className="col-6">{this.state.value}</div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        items: state.carts
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addCartInRedux : (product)=>{
            dispatch(actAddToCart(product));
            
            // dispatch(updateQtyInCart)
        },
        getCart : ()=>{
            dispatch({type : 'GET_CART'});
        },
        openPopup : ()=>{
            dispatch({type : 'OPEN_POPUP'})
        }
    }
}
export default connect(null, mapDispatchToProps)(Class1);