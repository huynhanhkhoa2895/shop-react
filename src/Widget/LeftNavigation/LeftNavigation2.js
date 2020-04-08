import React from 'react';
import './leftnavigation.css';
import { Link } from 'react-router-dom';

class LeftNavigation2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render(){
        return(
            <div className="leftnavigation row">
                <div className="col-md-12">
                    <ul>
                        <li>
                            <Link to="/customer/info">Thông tin cá nhân</Link>
                        </li>
                        <li>
                            <Link to="/customer/order">Lich sử đơn hàng</Link>
                        </li>
                        <li>
                            <Link to="/customer/address">Số địa chỉ</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default LeftNavigation2;