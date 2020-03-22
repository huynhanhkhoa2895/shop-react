import React from 'react';
class Checkout extends React.Component {
    constructor(props){        
        super(props);
        
    }
    componentDidMount() {
        console.log(getCookie('cart'))
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Giỏ Hàng</h3>
                    </div>
                </div>                
            </div>
        );
      }
}

export default Checkout;
