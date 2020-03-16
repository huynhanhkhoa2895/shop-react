import React from 'react';
import './ProductList.css';
import Product from '../../Widget/Product/Product.js';
import $ from 'jquery'
import AddToCart from '../AddToCart/AddToCart.js'
import { NavLink } from 'react-router-dom';

class ProductList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            product : []
        }
    }
    componentWillMount() {
        fetch("http://127.0.0.1:3000/api/v1/product/list?" + $.param( this.props.option ))
          .then(res => res.json())
          .then(
            (result) => {
                let image = [];
                result.image.forEach(element => {
                    if(image[element.product_id] == null) image[element.product_id] = [];
                    image[element.product_id].push(element.name);
                });
                result.product.map((e,index) => {
                    this.setState({
                        product : this.state.product.concat(
                            <div key={index} className="home-product-col">
                                <Product 
                                    key={index}
                                    product = {e}
                                    images={image[e.id]} 
                                    id={e.id} 
                                    price={e.price} 
                                    brand={e.brand_name} 
                                    brand_route={e.brand_route}
                                    category={e.category_name} 
                                    category_route={e.category_route} 
                                    route={e.route} 
                                    name={e.name} />
                            </div>
                        )
                    })
                    
                })
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
    }
    render() {
        return(
            <div className="row-list-product" style={{width : "100%",margin : "auto "}}>
                {this.state.product}
                <div className="clear"></div>
            </div>
        );
    }
}
export default ProductList;
