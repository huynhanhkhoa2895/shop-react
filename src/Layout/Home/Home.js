import React from 'react';
import Carousel from './Carousel.js';

import './Home.css';
import { NavLink } from 'react-router-dom';
import ProductList from '../../Default/ProductList/ProductList.js';
class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            product : []
        }
    }
    render() {
        return (                              
            <div className="container-full">
                <div className="carousel-container">
                    <Carousel />
                </div>
                <div className="row row-category">
                    <div className="col-md-3 pd0 h100">
                        <div className="row">
                            <div className="col-12 pd0">
                                <div className="row-category-box box-1">
                                    <div className="box-img">
                                        <img src={"home/h1.png"} alt="img" />
                                    </div>
                                    <NavLink to="men.html" className="box-button">Men</NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 pd0">
                                <div className="row-category-box box-1">
                                    <div className="box-img">
                                        <img src={"home/h2.png"} alt="img" />
                                    </div>
                                    <NavLink to="men.html" className="box-button">Men</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 pd0 h100">
                        <div className="row-category-box box-3">
                            <div className="box-img">
                                <img src={"home/h3.png"} alt="img" />
                            </div>
                            <NavLink to="men.html" className="box-button">Men</NavLink>
                        </div>
                    </div>
                    <div className="col-md-5 pd0 h100">
                        <div className="row">
                            <div className="col-6 pd0">
                                <div className="row-category-box box-1">
                                    <div className="box-img">
                                        <img src={"home/h4.png"} alt="img" />
                                    </div>
                                    <NavLink to="men.html" className="box-button">Men</NavLink>
                                </div>
                            </div>
                            <div className="col-6 pd0">
                                <div className="row-category-box box-1">
                                    <div className="box-img">
                                        <img src={"home/h5.png"} alt="img" />
                                    </div>
                                    <NavLink to="men.html" className="box-button">Men</NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{height : "350px"}}>
                            <div className="col-12 pd0 h100">
                                <div className="row-category-box">
                                    <div className="box-img">
                                        <img src={"home/h6.png"} alt="img" />
                                    </div>
                                    <NavLink to="men.html" className="box-button">Men</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h3 style={{"fontSize" : "24px","fontWeight" : "500"}} className="text-center">Hàng mới về</h3>
                    </div>
                </div>
                <div className="row-new-product" style={{width : "930px",margin : "auto "}}>
                    <ProductList option={{option : {limit : 6, order : {"product.created_at" : "desc"}}}} />
                </div>
            </div>
        );
      }
}

export default Home;
