import React from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';
class Footer extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        menus : [],
        sticky : 0
      };
    }
    render() {
        return (
            <footer>
                <div className="row email-subcrise">
                    <div className="col-md-2 offset-md-3" style={{paddingTop : "20px"}}>
                        <span className="f16" style={{color : "#fff"}}>LIÊN HỆ CHÚNG TÔI QUA EMAIL</span>
                    </div>
                    <div className="col-md-6" style={{paddingTop : "10px"}}>
                        <div>
                            <input placeholder="Email" style={{width : "300px",padding : "10px 5px", borderRadius : "6px 0 0 6px",float : "left",border : "unset",outline : "unset"}}/>
                            <button style={{padding : "10px", float : "left",border : "unset",outline : "unset",background : "#444",color : "#fff", borderRadius : "0 6px 6px 0"}}>SEND EMAIL</button>
                            <div className="clear"></div>
                        </div>
                    </div>
                </div>
                <div className="row footer-content">
                    <div className="col-md-3">
                        <h3 className="tt-collapse-title">HỖ TRỢ KHÁCH HÀNG</h3>
                        <div className="content-footer">
                            <ul>
                                <li>
                                    <p>Hotline đặt hàng: 1800-6963</p>
                                    <p>(Miễn phí , 8-21h kể cả T7, CN)</p>
                                </li>
                                <li>
                                    <p>Hotline chăm sóc khách hàng: 1900-6035</p>
                                    <p>(1000đ/phút , 8-21h kể cả T7, CN)</p>
                                </li>
                            </ul>                           
                        </div>
                    </div>                    
                    <div className="col-md-3">
                        <h3 className="tt-collapse-title">VỀ CHÚNG TÔI</h3>
                        <div className="content-footer">
                            <ul>
                                <li>
                                    <p><NavLink to="about.html">Giới thiệu Shop</NavLink></p>
                                </li>
                                <li>
                                    <p><NavLink to="about.html">Chính sách bảo mật thông tin cá nhân</NavLink></p>
                                </li>
                                <li>
                                    <p><NavLink to="about.html">Điều khoản sử dụng</NavLink></p>
                                </li>
                            </ul>                           
                        </div>
                    </div>
                    <div className="col-md-3">
                        <h3 className="tt-collapse-title">PHƯƠNG THỨC THANH TOÁN</h3>                        
                    </div>
                    <div className="col-md-3">
                        <h3 className="tt-collapse-title">KẾT NỐI VỚI CHÚNG TÔI</h3>
                    </div>
                </div>
            </footer>
        );
    }
}
export default Footer;