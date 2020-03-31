import React from 'react';
import './Customer.css';
import { Link } from 'react-router-dom';
import Helper from '../../lib/Helper' 
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle,faSpinner } from '@fortawesome/free-solid-svg-icons'
import {setCookie,getCookie} from '../../Widget/Cookie/Cookie.js'
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                email: '',
                password: '',
                repassword: '',
                name: '',
                phone: '',
                address : '',
                error : null,
                loading : false,
                allDone : false,
            };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async handleSubmit(event) {
        event.preventDefault();
        await this.setState({
            allDone : false,
        })
        
        if(this.state.email == '' || this.state.password == '' || this.state.repassword == ''){
            let xhtml_err = <div className="col-12 error-message"><FontAwesomeIcon icon={faExclamationTriangle} /> Mời bạn ghi đầy đủ thông tin bắt buộc</div>;
            this.setState({
                error : xhtml_err
            })
            console.log("ok",xhtml_err)
            return false;
        }
        if(this.state.password != this.state.repassword){
            let xhtml_err = <div className="col-12 error-message"><FontAwesomeIcon icon={faExclamationTriangle} /> Mật khẩu với nhập lại không giống nhau</div>;
            this.setState({
                error : xhtml_err
            })
            return false;
        }
        await this.setState({
            allDone : true,
        })
        if(this.state.allDone){
            await this.setState({
                loading : true
            })
            let data = {
                email: this.state.email,
                password: this.state.password,
                address: this.state.address,
                name: this.state.name,
                phone: this.state.phone,
            }
            await axios.post(Helper.apiUrlLocal()+"api/v1/register",JSON.stringify(data),{
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
    handleChange(event) {
        if(event.target.name == "phone" && isNaN(event.target.value)){
            return false;
        }
        this.setState({            
            [event.target.name] : event.target.value
        })

        // this.setState({value: event.target.value});
    }
    render(){
        return(
            <div className="container">
                <div className="row w100">
                    <div className="col-12">
                        <h3 className="ls01 colorGrey text-center">ĐĂNG KÝ</h3>
                    </div>
                </div>
                <div className="row w100">
                    <div className="col-md-12">
                        <div className="box-register">
                            <div className={(this.state.loading) ? "login-loading block" : "login-loading none"}>
                                <FontAwesomeIcon icon={faSpinner} spin size="4x"/>
                            </div>
                            <div className={(this.state.error) ? 'row block' : 'row none'}>
                                {this.state.error}
                            </div>
                            <form onSubmit={this.handleSubmit} method="POST">
                                <div className="form-group">
                                    <label className="b" >Họ và Tên</label>
                                    <input type="text" className="form-control"  name="name" value={this.state.name} onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label className="b" >Số Điện Thoại</label>
                                    <input type="text" className="form-control"  name="phone" value={this.state.phone} onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label className="b" >Địa Chỉ</label>
                                    <input type="text" className="form-control"  name="address" value={this.state.address} onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label className="b" >Email*</label>
                                    <input type="email" className="form-control"  name="email" value={this.state.email} onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label className="b">Password*</label>
                                    <input type="password" className="form-control"  name="password" value={this.state.password} onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label className="b">Re-Password*</label>
                                    <input type="password" className="form-control"  name="repassword" value={this.state.repassword} onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-6 pd0"><button className="btn-in-box-register" type="submit" >Đăng Ký</button></div>
                                        <div className="col-md-6 text-right"><Link className="block pull-right" to="/customer/login.html">Nếu bạn đã có tài khoản hãy đăng nhập</Link></div>
                                    </div>                                  
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register;