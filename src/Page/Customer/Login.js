import React from 'react';
import './Customer.css';
import { Link } from 'react-router-dom';
import Helper from '../../lib/Helper' 
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle,faSpinner } from '@fortawesome/free-solid-svg-icons'
import {setCookie,getCookie} from '../../Widget/Cookie/Cookie.js'
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                valueEmail: '',
                valuePass: '',
                error : null,
                loading : false,
            };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChange(event) {
        if(event.target.name == 'email'){
            this.setState({
                valueEmail : event.target.value
            })
        }
        if(event.target.name == 'password'){
            this.setState({
                valuePass : event.target.value
            })
        }
        // this.setState({value: event.target.value});
      }
    
      async handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.valueEmail,this.state.valuePass)
        if(this.state.valueEmail == '' || this.state.valuePass == ''){
            let xhtml_err = <div className="col-12 error-message"><FontAwesomeIcon icon={faExclamationTriangle} /> Mời bạn ghi đầy đủ thông tin</div>;
            this.setState({
                error : xhtml_err
            })
            event.preventDefault();
        }else{
            await this.setState({
                loading : true
            })
            await axios.post(Helper.apiUrlLocal()+"api/v1/login",JSON.stringify({email : this.state.valueEmail,password : this.state.valuePass}),{
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
                this.setState({
                    error : null,
                    loading : false
                })
                if(result.status == 0){
                    let xhtml_err = [];
                    result.msg.map((e,k)=>{
                            xhtml_err.push(
                                <div key={"msg_"+k} className="col-12 error-message">
                                    <FontAwesomeIcon icon={faExclamationTriangle} /> {e}
                                </div>
                            )
                        }
                    )
                    this.setState({
                        error : xhtml_err
                    })
                }else{
                    setCookie("customer",result.user)
                    setCookie("token",result.token)
                    this.props.history.push('/customer')
                }
            })
        }
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
                            <Link className="btn-in-box-login" to="/customer/register.html">Đăng ký khách hàng mới</Link>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="box-login">
                            <div className={(this.state.loading) ? "login-loading block" : "login-loading none"}>
                                <FontAwesomeIcon icon={faSpinner} spin size="4x"/>
                            </div>
                            <h3 className="color">Đăng Nhập</h3>
                            <p style={{margin : 0}}>Nếu bạn đã có tài khoản xin hãy đăng nhập</p>
                            <div className={(this.state.error) ? 'row block' : 'row none'}>
                                {this.state.error}
                            </div>
                            <form onSubmit={this.handleSubmit} method="POST">
                                <div className="form-group">
                                    <label className="b" >Email</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" value={this.state.valueName} onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label className="b">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword" name="password" value={this.state.valuePass} onChange={this.handleChange}/>
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