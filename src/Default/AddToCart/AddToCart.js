import React from 'react';
import './AddToCart.css';
import $ from 'jquery'
import { NavLink } from 'react-router-dom';
class AddToCart extends React.Component {
    constructor(props){
        
        super(props);
        this.state = {
            images : [],
            smallImg : [],
            qty: this.props.qty == null ? 1 : this.props.qty
        }
        
    }
    componentDidMount() {

    }
    AddCart(){
        const [cookies, setCookie] = useCookies(['name']);
        setCookie('name', '123');
        console.log("Đã Add");
    }
    render() {
        return (
            <button className="btn-cart" onClick={()=> this.AddCart()}>Thêm vào giỏ hàng</button>
        );
    }
}
export default AddToCart;