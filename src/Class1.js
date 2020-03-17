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
        this.addCart = this.props.addCartInRedux.bind(this)
    }
    getCart(){
        console.log("CART");
    }
    addCart(){
        this.setState({
            cart : this.state.cart++,
        })
    }
    render() {
        return (
            <div className="row">
                <div className="col-6"><button onClick={() => {
                    this.addCart.bind(this)
                    
                }}>CLICK</button></div>
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
        addCartInRedux : ()=>{
            dispatch(actAddToCart);
            // dispatch(updateQtyInCart)
        }
    }
}
export default connect(null, mapDispatchToProps)(Class1);