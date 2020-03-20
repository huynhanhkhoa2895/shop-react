import React from 'react';
import './Product.css';
import $ from 'jquery'
import AddToCart from '../AddToCart/AddToCart.js'
import { NavLink } from 'react-router-dom';
import Helper from '../../lib/Helper'
class Product extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            images : [],
            smallImg : [],
            small : this.props.small ? 'small' : '',
            mainImg : this.props.images == null ? 'no_image.png' : this.props.images[0]
        }

    }
    componentWillMount(){
        if(this.props.images == null){
            this.setState({
                images : ['no_image.png']
            });
        }else{
            this.setState({
                images : this.props.images
            });
        }
        

    }
    activeSmallImage(e,data){
        $(e.target).closest(".product-small-image").find(".box-small-img").removeClass("active");
        $(e.target).closest(".box-small-img").addClass("active");
        this.setState({
            mainImg : data,
        })
    }
    componentDidMount() {
        let arr = [];
        this.state.images.map((e,index)=>{       
            arr.push(
                <div onClick={(e2) => this.activeSmallImage(e2,e)} key={index} className={index === 0 ? 'box-small-img active' : 'box-small-img'}>
                    <img src={window.location.origin + '/product/' + e} alt={this.props.name} />
                </div>
            )     
        })
        this.setState({
            smallImg : arr
        })
    }
    render() {
        return (
            <div className={"product-container-box "+ this.state.small}>
                <div className="box-img">
                    <NavLink className="text-center" to={"product/"+this.props.route}>
                        <img src={window.location.origin + '/product/' + this.state.mainImg} alt={this.props.name}/>
                    </NavLink>
                </div>
                <div className="box-content">
                    <div className="product-brand text-center">
                        <NavLink className="text-center" to={"category/"+this.props.brand_route}>{this.props.brand}</NavLink>
                    </div>
                    <div className="product-name text-center">
                        <NavLink className="text-center" to={"product/"+this.props.route}>{this.props.name}</NavLink>
                    </div>
                    <div className="product-price text-center">
                        <span className="text-center">{Helper.format_curency(this.props.price)} <b>VND</b></span>
                    </div>
                    <div className="product-small-image text-center">
                        {this.state.smallImg}
                    </div>
                    <div className="product-add-to-cart text-center">
                        <div style={{maxWidth : '150px',margin : 'auto'}}>
                            <AddToCart product={this.props.product} qty={this.state.qty == null ? 1 : this.state.qty} img={this.state.images}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Product;