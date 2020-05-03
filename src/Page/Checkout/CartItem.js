import React from 'react';
import { NavLink,Link } from 'react-router-dom';
import './Checkout.css';
import Helper from '../../lib/Helper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faMinus,faTrash } from '@fortawesome/free-solid-svg-icons'
class CartItem extends React.Component {
    constructor(props){        
        super(props);
        this.state = {
            cart : this.props.cart,
            img : (this.props.cart.img == null) ? 'no-image.png' : this.props.cart.img[0],
            product : this.props.cart.product,
            qty : this.props.cart.qty,
            option : this.props.cart.option,
            info : this.props.info,
        }
        this.handleChange = this.handleChange.bind(this);
        this.changeQty = this.changeQty.bind(this);
        this.removeItemInCart= this.removeItemInCart.bind(this)
        this.updateItemInCart = this.updateItemInCart.bind(this)
    }
    handleChange(event){
        this.setState({
            qty : event.target.value
        })
    }
    async changeQty(type){
        if(type === "plus"){
            await this.setState({
                qty : this.state.qty+=1,
            })
        }else{
            if(this.state.qty > 1){
                await this.setState({
                    qty : this.state.qty-=1,
                })
            }
        }
        this.updateItemInCart()
    }
    removeItemInCart(){
        this.props.removeItemInCart(this.props.cart.product.id)

    }
    getTemplateOption(){
        let arrOption = []
        if(this.props.cart.option != null && this.props.cart.option.length > 0){
            this.props.cart.option.map((e,k)=>{
                arrOption.push(
                    <p key={k+"_p"}>
                        <span className="colorGrey f14 b">{e.option.name}: </span>
                        <span>{e.option_id == 2 ? <span style={{display : "inline-block",height : 15,width : 15,background : e.option.value}}></span> : e.option.value}</span>
                    </p>
                )
            })
        }
        return arrOption;
    }
    updateItemInCart(){
        this.props.updateItemInCart(this.props.cart.product.id,(this.state.qty !== 0) ? this.state.qty : this.state.product.qty)
    }
    render(){
        return(
            <tr>
                <td>
                    <div className="td-product">
                        <div className="product-image" style={{overflow : "hidden"}}>
                            <Link to={"/product/"+this.props.cart.product.route}>
                                <img src={window.location.origin + "/img/product/"+this.props.cart.img[0]} alt={this.props.cart.product.name}/>
                            </Link>
                        </div>
                        <div className="product-name">
                            <p><Link to={"/product/"+this.props.cart.product.route}>{this.props.cart.product.name}</Link></p>
                            {this.getTemplateOption()}
                        </div>
                    </div>
                </td>
                <td>
                    <Link className="colorGrey" to={"/category/"+this.props.cart.product.category_route}>{this.props.cart.product.category_name}</Link>
                </td>
                <td>
                    <Link className="colorGrey" to={"/category/"+this.props.cart.product.brand_route}>{this.props.cart.product.brand_name}</Link>
                </td>
                <td>
                    <div className="row product-checkout-qty" style={{maxWidth : "120px"}}>
                        <div className="col-4 pd0 qty-plus"><button onClick={() => this.changeQty("plus")}><FontAwesomeIcon icon={faPlus} color="#fff"/></button></div>
                        <div className="col-4 pd0 qty-input"><input value={this.props.cart.qty} readOnly/></div>
                        <div className="col-4 pd0 qty-minus"><button onClick={() => this.changeQty("minus")}><FontAwesomeIcon icon={faMinus} color="#fff"/></button></div>
                    </div>  
                </td>
                <td>
                    <span className="f16 fw500">{Helper.format_curency(this.props.cart.product.price*this.props.cart.qty)} VND</span>
                </td>
                <td>
                    <span onClick={this.removeItemInCart} style={{display : "block",cursor : "pointer"}}><FontAwesomeIcon icon={faTrash} className="color" fontSize="16px"/></span>
                </td>
            </tr>
        )
    }
}

export default CartItem;