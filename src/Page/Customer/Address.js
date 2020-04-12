import React from 'react';
import LeftNavigation2 from '../../Widget/LeftNavigation/LeftNavigation2.js'
import {setCookie,getCookie,removeCookie,clearCookie} from '../../Widget/Cookie/Cookie.js'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle,faSpinner,faPlusCircle,faTimes } from '@fortawesome/free-solid-svg-icons'
import './Customer.css';
import $ from 'jquery'
import {connect} from 'react-redux';
import Helper from '../../lib/Helper'

class Address extends React.Component {
    constructor(props) {
        const customer = getCookie("customer");   
        const token =   getCookie("token");
        super(props);
        if(customer == null || token == null){
            this.props.Logout()
            setCookie("error_login",JSON.stringify({redirect : '/customer/address',msg : "Thời gian đăng nhập hết hạn, bạn phải đăng nhập lại"}))
            this.props.history.push('/customer/login.html')
        }
        this.state = {
            customer: customer,
            token: token,
            activeTabAddForm : true,
            name : customer == null ? null : customer.name,
            address : customer == null ? null :customer.address,
            phone : customer == null ? null : customer.phone,
            province : customer.state == "" ? 1 : customer.state,
            error : null,
            ship : [],
            ship_id : null,
            allProvince : [],

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.chooseShipAddAddress = this.chooseShipAddAddress.bind(this)


    }
    componentDidMount(){
        fetch(Helper.apiUrlLocal()+"api/v1/loadListProvince")
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
        this.loadListShip()
    }
    chooseShipAddress(it,e){
        $(".box-ship").removeClass("active")
        $(it.currentTarget).addClass("active")
        this.setState({
            ship_id : e.id
        })
    }
    chooseShipAddAddress(type="add"){
        let activeTabAddForm =false
        if(type == "add"){
            activeTabAddForm = true
        }else{
            activeTabAddForm = false
            this.loadListShip()
        }
        this.setState({
            activeTabAddForm : activeTabAddForm
        })

    }
    handleChange(event){
        if(event.target.name == "phone" && isNaN(event.target.value)){
            return false;
        }
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    deleteAddress(e){
        this.props.openLoading()
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: "Bearer "+this.state.token,
        }
        // axios.defaults.headers.common["Authorization"] =  "Bearer "+this.state.token;
        axios.delete(Helper.apiUrlLocal()+"api/v1/customer/deleteAddress?id="+e.id)
        .then(reponse=>{
            this.props.closeLoading()
            this.loadListShip();
            this.chooseShipAddAddress();
            // this.props.closeLoading();
            // this.props.clearCart();
            // this.props.history.push('/customer/success')
        })
    }
    loadListShip(){
        fetch(Helper.apiUrlLocal()+"api/v1/customer/getInfoShipping?"+$.param({"id" : this.state.customer.id}),{
            headers : {
                "Authorization" : "Bearer "+this.state.token,
            },
        })
        .then(res => {
            if(res.status == 401){
                this.props.Logout();
                setCookie("error_login",JSON.stringify({redirect : '/checkout/cart',msg : "Thời gian đăng nhập hết hạn, bạn phải đăng nhập lại"}))
                this.props.history.push('/customer/login.html')
                return false;
            } 
            return res.json()
        })
        .then(
          (result) => {
                let xhtml_ship = [];
                if(result == null) return false
                this.setState({
                    allProvince : result.province
                })
               
                if(result.ship != null && result.ship.length != 0){
                    this.setState({
                        ship_id : result.ship[0].id,
                    })
                    result.ship.map((e,k)=>
                        xhtml_ship.push(
                        <div className="col-md-12 mgb10" key={k+"_dfsafads45"}>
                            <div className={"box-ship " + ((k==0) ? "active" : "")} onClick={(e2)=> this.chooseShipAddress(e2,e)}>
                                <div className="close-box">
                                    <FontAwesomeIcon icon={faTimes} onClick={()=> this.deleteAddress(e)} />
                                </div>
                                <p>Họ tên: <span className="text-uppercase font-weight-bold">{e.name}</span></p>
                                <p>Địa chỉ:  <span>{e.address}</span></p>
                                <p>Số điện thoại: <span>{e.phone}</span></p>
                                <p>Tỉnh Thành Phố: <span>{this.state.allProvince.map((e2)=>{ if(e2.id == e.state){return (<span>{e2.name}</span>);}})}</span></p>
                            </div>
                        </div>)
                    )
                    xhtml_ship.push(
                        <div className="col-md-12 mgb10" key={+"test_dfsafads5"}>
                            <div className={"box-ship text-center"} onClick={() => this.chooseShipAddAddress("add")}>
                                <FontAwesomeIcon className="color" icon={faPlusCircle} size="3x" style={{marginTop: 30}}/>
                            </div>
                        </div>
                    )
                    
                    this.setState({
                        xhtml_ship : xhtml_ship,
                        activeTabAddForm : false,
                    })
                }
                this.setState({
                    ship : result.ship
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
    async handleSubmit(event) {
        event.preventDefault();
        if(this.state.name == '' || this.state.address == '' || this.state.province == '' || this.state.phone == ''){
            let xhtml_err = <div className="col-12 error-message"><FontAwesomeIcon icon={faExclamationTriangle} /> Mời bạn ghi đầy đủ thông tin</div>;
            this.setState({
                error : xhtml_err
            })
            event.preventDefault();
        }else{
            this.setState({
                error : null,
                loading : true
            })
            axios.defaults.headers = {
                'Content-Type': 'application/json',
                Authorization: "Bearer "+this.state.token,
            }
            // axios.defaults.headers.common["Authorization"] =  "Bearer "+this.state.token;
            await axios.post(Helper.apiUrlLocal()+"api/v1/customer/addInfoShip",JSON.stringify({customer_id : this.state.customer.id,name : this.state.name,address : this.state.address,province : this.state.province,phone : this.state.phone}),{
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
                    loading : false,
                    activeTabAddForm : false
                })
                
                this.loadListShip()
            })
        }
    }
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <LeftNavigation2 />
                    </div>
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-12">
                                <div className={"tab-ship relative " + (!this.state.activeTabAddForm ? "active" : "")}>
                                    <div className="row">
                                        {this.state.xhtml_ship}
                                    </div>
                                </div>
                                <div className={"tab-ship relative " + (this.state.activeTabAddForm ? "active" : "")}>
                                    <div className={(this.state.loading) ? "loading block" : "loading none"}>
                                        <FontAwesomeIcon className="icon-loading" icon={faSpinner} spin size="4x"/>
                                    </div>
                                    <div className={(this.state.error) ? 'row block' : 'row none'}>
                                        {this.state.error}
                                    </div>
                                    <form onSubmit={this.handleSubmit} method="POST">
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
                                            <div className="row">
                                                <div className="col pd0" >
                                                    <button type="button" className={"btn btn-link pd0 " + (this.state.ship.length == 0 ? "none" : "block")} onClick={()=>this.chooseShipAddAddress("list")}>Chọn những địa chỉ có sẵn</button>
                                                </div>
                                                <div className="col pd0">
                                                    <button className="btn-box right" type="submit" >Thêm thông tin</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
          Logout : ()=>{
            dispatch({type: 'LOGOUT'})
          }
    }
}
export default connect(null, mapDispatchToProps)(Address);