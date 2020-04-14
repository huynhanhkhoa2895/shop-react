import React from 'react';
import axios from 'axios';
import './Customer.css';
import Helper from '../../lib/Helper' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle,faSpinner } from '@fortawesome/free-solid-svg-icons'
import {setCookie,getCookie,removeCookie,clearCookie} from '../../Widget/Cookie/Cookie.js'
import LeftNavigation2 from '../../Widget/LeftNavigation/LeftNavigation2.js'
import {connect} from 'react-redux';

class Customer extends React.Component {
    constructor(props) {
        const customer = getCookie("customer");   
        const token =   getCookie("token");
        super(props);

        if(customer == null || token == null){
            this.props.Logout()
            this.props.history.push('/customer/login.html')
            return false
        }
        this.state = {
            customer: customer,
            token: token,
            error : null,
            allDone: false,
            allProvince : [],
            name : customer == null ? null : customer.name,
            address : customer == null ? null :customer.address,
            phone : customer == null ? null : customer.phone,
            province : customer.state == "" ? 1 : customer.state,
            activeTabAddForm : true,
            allProvince : [],
            isChangePassword : false,
            password : "",
            oldpassword : "",
            repassword : "",
            success : false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        fetch(Helper.apiUrl()+"api/v1/loadListProvince")
        .then(res => {
            if(res.status == 401){
                removeCookie("customer")
                removeCookie("token")
                return this.props.history.push('/customer/login.html')
            }else{
                return res.json()
            }
        })
        .then(
          (result) => {

            this.setState({
                allProvince : result
            })

          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
    handleChange(event){
        if(event.target.name == "phone" && isNaN(event.target.value)){
            return false;
        }
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    async handleSubmit(event){
        event.preventDefault();
        this.props.openLoading()
        this.setState({
            error : null,
            success : false,
        })
        let allDone = true;
        if(this.state.isChangePassword){
            let err_msg = ""
            if(this.state.password == ""){
                err_msg = "Mời bạn ghi đầy đủ thông tin";
                allDone = false;
            }else if(this.state.repassword != this.state.password){
                err_msg = "Mật khẩu và nhập lại mật khẩu không giống nhau";
                allDone = false;
            }
            if(!allDone){
                let xhtml_err = <div className="col-12 error-message"><FontAwesomeIcon icon={faExclamationTriangle} />{err_msg}</div>;
                this.setState({
                    error : xhtml_err,
                    password : "",
                    oldpassword : "",
                    repassword : "",
                })
                event.preventDefault();
                this.props.closeLoading()
                return false;
            }
        }
        if(allDone){
            axios.defaults.headers = {
                'Content-Type': 'application/json',
                Authorization: "Bearer "+this.state.token,
            }
            let data = {
                state : this.state.province,
                name : this.state.name,
                phone : this.state.phone,
                address : this.state.address
            }
            axios.defaults.headers =  {
                'Content-Type' : 'application/json',
                "Access-Control-Allow-Origin" : "*",
                "access-control-allow-origin" : "*",
                "Access-Control-Allow-Headers" : 'Origin, X-Requested-With, Content-Type, Accept',
                Authorization: "Bearer "+this.state.token,
            }
            await axios.put(Helper.apiUrl()+"api/v1/customer/updateInfo",JSON.stringify({id : this.state.customer.id,customer : data,isChangePassword : this.state.isChangePassword,password : this.state.password,oldpassword : this.state.oldpassword}),{
                headers: {
                    'Content-Type' : 'application/json',
                    "Access-Control-Allow-Origin" : "*",
                    "access-control-allow-origin" : "*",
                    "Access-Control-Allow-Headers" : 'Origin, X-Requested-With, Content-Type, Accept',
                    // 'Origin' : Helper.apiUrl()
                }
                // headers: headers,
            })
            .then((reponse)=>{
                // if(res.status == 401){
                //     this.props.Logout();
                //     setCookie("error_login",JSON.stringify({redirect : '/checkout/cart',msg : "Thời gian đăng nhập hết hạn, bạn phải đăng nhập lại"}))
                //     this.props.history.push('/customer/login.html')
                //     return false;
                // } 
                this.props.closeLoading()
                if(reponse.data.err == 1){
                    let xhtml_err = <div className="col-12 error-message"><FontAwesomeIcon icon={faExclamationTriangle} />{reponse.data.msg}</div>;
                    this.setState({
                        error : xhtml_err
                    })
                }else{
                    let customer = reponse.data.info;
                    setCookie("customer",customer)
                    this.setState({
                        customer : customer,
                        name : customer == null ? null : customer.name,
                        address : customer == null ? null :customer.address,
                        phone : customer == null ? null : customer.phone,
                        province : customer.state == "" ? 1 : customer.state,
                        password : "",
                        oldpassword : "",
                        repassword : "",
                        success : true
                    })
                }

                // this.setState({
                //     error : null,
                //     loading : false,
                //     activeTabAddForm : false
                // })
                
                // this.loadListShip()
            }).catch(error=>{
                console.log(error)
                // if(error.response.status == 401){
                //     this.props.Logout();
                //     setCookie("error_login",JSON.stringify({redirect : '/customer',msg : "Thời gian đăng nhập hết hạn, bạn phải đăng nhập lại"}))
                //     this.props.history.push('/customer/login.html')
                //     return false;
                // }
            })
        }
    }
    isChangePassword(){
        this.setState({
            isChangePassword : !this.state.isChangePassword
        })
    }
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <LeftNavigation2 />
                    </div>
                    <div className="col-md-10">
                        <div className={(this.state.success == true) ? 'row block' : 'row none'}>
                            <div className="col-12 pd0">
                                <div className="alert alert-success fw500">
                                    Cập nhật thông tin thành công
                                </div>
                            </div>
                        </div>
                        <div className={(this.state.error != null) ? 'row block' : 'row none'}>
                            {this.state.error}
                        </div>
                        <form className="form" onSubmit={this.handleSubmit} method="PUT">
                            <div className="form-group">
                                <label className="b" >Họ và Tên</label>
                                <input type="name" className="form-control" name="name" aria-describedby="emailHelp" value={this.state.name} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label className="b">Địa chỉ</label>
                                <input type="address" className="form-control" name="address" value={this.state.address} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label className="b">Số điện thoại</label>
                                <input type="phone" className="form-control" name="phone" value={this.state.phone} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label className="b">Tỉnh thành phố</label>
                                <select className="form-control" name="province" value={this.state.province} onChange={this.handleChange}>
                                    {
                                        this.state.allProvince.map((e,k)=>
                                            <option key={k+"e.name"} value={e.id}>{e.name}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <div className="left mgr5" style={{marginTop : 3}}>
                                    <input type="checkbox" value={this.state.isChangePassword} onChange={()=>this.isChangePassword()}/>
                                </div>
                                <div className="left">
                                    <span>Bạn có muốn đổi mật khẩu</span>
                                </div>
                                <div className="clear"></div>
                            </div>
                            <div className={this.state.isChangePassword ? "block" : "none"}>
                                <div className="form-group">
                                    <label className="b">Mật khẩu cũ</label>
                                    <input type="password" className="form-control" name="oldpassword" value={this.state.oldpassword} onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label className="b">Mật khẩu mới</label>
                                    <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label className="b">Nhập lại mật khẩu mới</label>
                                    <input type="password" className="form-control" name="repassword" value={this.state.repassword} onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col pd0">
                                        <button className="btn-box right" type="submit" >Cập nhật thông tin</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
      carts: state.carts,
      minicart: state.minicart,
    }
  }
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        closeLoading : ()=>{
            dispatch({type : 'CLOSE_LOADING'})
          },
          openLoading : ()=>{
            dispatch({type : 'OPEN_LOADING'})
          },
          clearCart : ()=>{
              dispatch({type: 'CLEAR_CART'})
          },
          Logout : ()=>{
            dispatch({type: 'LOGOUT'})
          }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Customer);
