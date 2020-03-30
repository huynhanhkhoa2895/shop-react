import React from 'react';
import './Customer.css';
import { Link } from 'react-router-dom';
import Helper from '../../lib/Helper' 
import axios from 'axios';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                valueName: '',
                valuePass: ''
            };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        axios.post(Helper.apiUrlLocal()+"api/v1/login",JSON.stringify({email : "customer@gmail.com",password : 6543217}),{
            headers: {
                'Content-Type' : 'application/json',
                "Access-Control-Allow-Origin" : "*",
                "access-control-allow-origin" : "*",
                "Access-Control-Allow-Headers" : 'Origin, X-Requested-With, Content-Type, Accept',
                // 'Origin' : Helper.apiUrlLocal()
            }
            // headers: headers,
        })
        .then(reponse=>{
            let result = reponse.data;
            console.log(result);
        })
        event.preventDefault();
      }
    render(){
        return(
            <div className="container-fluid">
                <div className="row w100">
                    <div className="col-md-12 text-center col-sm-12">
                        <h3 className="ls01 colorGrey">ĐĂNG NHẬP</h3>
                    </div>
                </div>
                <div className="row w100">
                    <div className="col-md-3 offset-md-3 col-sm-12 offset-sm-0">
                        <div className="box-login">
                            <h3 className="color">Khách hàng mới</h3>
                            <p>
                                Bằng cách tạo tài khoản với cửa hàng của chúng tôi, bạn sẽ có thể chuyển qua quy trình thanh toán nhanh hơn, lưu trữ nhiều địa chỉ giao hàng, xem và theo dõi đơn hàng của bạn trong tài khoản của bạn và hơn thế nữa.
                            </p>
                            <Link className="btn-in-box-login" to="/customer/register">Đăng ký khách hàng mới</Link>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="box-login">
                            <h3 className="color">Đăng Nhập</h3>
                            <p>Nếu bạn đã có tài khoản xin hãy đăng nhập</p>
                            <form onSubmit={this.handleSubmit} method="POST">
                                <div className="form-group">
                                    <label className="b" >Email</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" value={this.state.valueName} />
                                </div>
                                <div className="form-group">
                                    <label className="b">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword" name="password" value={this.state.valuePass} />
                                </div>
                                <div className="form-group">
                                    <button className="btn-in-box-login" type="submit" >Đăng nhập</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;