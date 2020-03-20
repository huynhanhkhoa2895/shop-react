import React from 'react';
import './ProductView.css';
import $ from 'jquery'
import { NavLink,Redirect } from 'react-router-dom';
import AddToCart from '../../Widget/AddToCart/AddToCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faMinus } from '@fortawesome/free-solid-svg-icons'
import ProductList from '../../Widget/ProductList/ProductList.js';
import Helper from '../../lib/Helper'
class ProductView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            product : {},
            mainImg : '',
            smallImg : [],
            images : [],
            qty : 1,
        }
    }
    componentWillMount() {
        fetch("http://127.0.0.1:3000/api/v1/product/view/"+this.props.match.params.route)
        .then(res => res.json())
        .then(
          (result) => {
              if(result.product.length === 0){                  
                return <Redirect to="not-found.html" />
              }else{
                  this.setState({
                    mainImg : result.image[0].name,
                    images : result.image,
                    product : result.product
                  })
                  let arr = [];
                  this.state.images.map((e,index)=>{       
                      arr.push(
                          <div onClick={(e2) => this.activeSmallImage(e2,e)} key={index} className={index === 0 ? 'box-small-img active' : 'box-small-img'}>
                              <img src={window.location.origin + '/product/' + e.name} alt={this.props.name} />
                          </div>
                      )     
                  })        
                  this.setState({
                      smallImg : arr
                  })
              }
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
    activeSmallImage(e,data){
        $(e.target).closest(".product-small-image").find(".box-small-img").removeClass("active");
        $(e.target).closest(".box-small-img").addClass("active");
        this.setState({
            mainImg : data.name,
        })
    }
    changeQty(type){
        if(type === "plus"){
            this.setState({
                qty : this.state.qty+=1,
            })
        }else{
            if(this.state.qty > 1){
                this.setState({
                    qty : this.state.qty-=1,
                })
            }
        }
    }
    render() {
        if(Object.keys(this.state.product).length !== 0){
            return ( 
                <div className="container product-container">
                    <div className="row">
                        <div className="col-md-6 product-img">
                            <div className="product-main-img">
                                <img src={window.location.origin + '/product/' + this.state.mainImg} alt={this.props.name}/>
                            </div>
                            <div className="product-small-image text-center">
                                {this.state.smallImg}
                            </div>
                        </div>
                        <div className="col-md-6 product-description">
                            <div className="product-info">
                                <p className="f16">SKU: <span className="colorGrey">{this.state.product.sku}</span></p>
                                <p className="f16">Hãng: <NavLink to={'/brand/' + this.state.product.brand_route}><span className="colorGrey">{this.state.product.brand_name}</span></NavLink> Loại Hàng: <NavLink to={'/category/' + this.state.product.category_route}><span className="colorGrey">{this.state.product.category_name}</span></NavLink></p>
                            </div>
                            <div className="product-name">
                                <p className="font-title" style={{fontSize : "24px"}}><b>{this.state.product.name}</b></p>
                                <p className="font-title f18" style={{color: "#f3a839"}}><b>{Helper.format_curency(this.state.product.price)} VND</b></p>
                            </div>
                            <div className="product-checkout">
                                <div className="row">
                                    <div className="col-md-4 pd0">
                                        <div className="row product-checkout-qty">
                                            <div className="col-4 pd0 qty-plus"><button onClick={() => this.changeQty("plus")}><FontAwesomeIcon icon={faPlus} color="#fff"/></button></div>
                                            <div className="col-4 pd0 qty-input"><input value={this.state.qty} readOnly/></div>
                                            <div className="col-4 pd0 qty-minus"><button onClick={() => this.changeQty("minus")}><FontAwesomeIcon icon={faMinus} color="#fff"/></button></div>
                                        </div>                                        
                                    </div>
                                    <div className="col-md-8">
                                        <AddToCart product={this.state.product} qty={this.state.qty} img={this.state.images} />
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{margin : "20px 0 !important"}}>
                        <div className="col-md-12">
                            <h3 style={{"fontSize" : "24px","fontWeight" : "500"}} className="text-center">Sản phẩm cùng thể loại</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div style={{width : "930px",margin : "auto"}}>
                                <ProductList option={{option : {limit : 6, order : {"product.created_at" : "desc"}, where : {"product.category_id" : this.state.product.category_id}}}} />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return (<div></div>)
        }
        
    }
}
export default ProductView;
