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
                <div className="row">
                    TRANG HOME
                </div>
            </div>
        );
      }
}

export default Home;
