import React from 'react';
import './ProductView.css';
import { NavLink,Redirect } from 'react-router-dom';
class ProductView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            product : {},
            images : []
        }
    }
    componentWillMount() {
        fetch("http://127.0.0.1:3000/api/v1/product-detail/"+this.props.match.params.route)
        .then(res => res.json())
        .then(
          (result) => {
              if(result.product.length == 0){
                  console.log(result.product);
                return <Redirect to="not-found.html" />
              }
              console.log(result);
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
        return ( 
            <div className="container">
                <div className="row">
                    <div className="col-md-6 product-img">
                        <div className="product-main-img">
                            
                        </div>
                        <div className="product-small-img"></div>
                    </div>
                    <div className="col-md-6 product-description"></div>
                </div>
            </div>
        )
    }
}
export default ProductView;
