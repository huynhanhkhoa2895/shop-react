import React from 'react';
import Carousel from './Carousel.js';
import './Home.css';
class Home extends React.Component {
    render() {
        return (                              
            <div className="container-full">
                <div className="carousel-container">
                    <Carousel />
                </div>
                <div className="row row-category">
                    <div className="col-md-3">
                        <div className="row">
                            <div className="col-12">
                                <div className="row-category-box">
                                    <img src={"home/demo01_03_256x.webp"} alt="img" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12"></div>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                    <div className="col-md-6"></div>
                </div>
            </div>
        );
      }
}

export default Home;
