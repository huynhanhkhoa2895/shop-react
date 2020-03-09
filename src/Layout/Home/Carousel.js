import React from 'react';
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css'; 
class Carousel extends React.Component {
    render() {
        return (
            <OwlCarousel
                className="owl-theme"
                loop
                margin={10}
                items="1"
            >
                <div className="item">
                    <img src={'banner/banner.png'} alt="banner"/>
                </div>
                <div className="item">
                    <img src={'banner/banner2.png'} alt="banner"/>
                </div>
                <div className="item">
                    <img src={'banner/banner3.png'} alt="banner"/>
                </div>
            </OwlCarousel>
        );
      }
}

export default Carousel;
