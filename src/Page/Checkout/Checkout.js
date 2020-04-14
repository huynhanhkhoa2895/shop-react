import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle,faSpinner,faPlusCircle,faTimes } from '@fortawesome/free-solid-svg-icons'
import {setCookie,getCookie,removeCookie,clearCookie} from '../../Widget/Cookie/Cookie.js'
import $ from 'jquery'
import Helper from '../../lib/Helper'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
class Checkout extends React.Component {
    constructor(props){        
        const customer = getCookie("customer");   
        const token =   getCookie("token");
        super(props);

        if(customer == null || token == null){
            clearCookie();
            this.props.history.push('/customer/login.html')
            return false
        }
        this.state = {
            customer: customer,
            token: token,
            ship : [],
            ship_id : null,
            xhtml_ship : null,
            xhtml_cart : [],
            error : null,
            errorConfirm : null,
            allDone: null,
            loading : false,
            name : customer == null ? null : customer.name,
            address : customer == null ? null :customer.address,
            phone : customer == null ? null : customer.phone,
            province : customer.state == "" ? 1 : customer.state,
            activeTabAddForm : true,
            allProvince : [],
            paymentAtHome : true,
            total : 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadListShip = this.loadListShip.bind(this);
        this.chooseShipAddAddress = this.chooseShipAddAddress.bind(this)
    }
    componentDidMount() {
        if(getCookie("error_login") != null){
            removeCookie("error_login")
        }
        let total = 0;
        Object.keys(this.props.carts).map(e => {
            total += this.props.carts[e].qty*this.props.carts[e].product.price
        });
        this.setState({
            total : total
        })
        this.loadListShip();
    }
    handleChange(event){
        if(event.target.name == "phone" && isNaN(event.target.value)){
            return false;
        }
        if(event.target.name == "hinhthuc"){
            this.setState({
                paymentAtHome : !this.state.paymentAtHome
            })
            return false;
        }
        this.setState({
            [event.target.name] : event.target.value
        })
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
            await axios.post(Helper.apiUrl()+"api/v1/customer/addInfoShip",JSON.stringify({customer_id : this.state.customer.id,name : this.state.name,address : this.state.address,province : this.state.province,phone : this.state.phone}),{
                headers: {
                    'Content-Type' : 'application/json',
                    "Access-Control-Allow-Origin" : "*",
                    "access-control-allow-origin" : "*",
                    "Access-Control-Allow-Headers" : 'Origin, X-Requested-With, Content-Type, Accept',
                    // 'Origin' : Helper.apiUrl()
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
    chooseShipAddress(it,e){
        $(".box-ship").removeClass("active")
        $(it.currentTarget).addClass("active")
        this.setState({
            ship_id : e.id
        })
    }
    loadTemplateCart(){
        let xhtml_cart = [];
        
        if(this.props.carts.length == 0 || this.props.carts == null){
            this.props.history.push('/customer/login.html')
        }
        

        this.props.carts.map((e,k)=>{
            xhtml_cart.push(
                <div key={k+"xhtml_cart"} className="row mgb20">
                    <div className="col-md-2 pd0">
                        <div className="box-img">
                            <Link to={"/product/"+e.product.route}>
                                <img src={"/product/"+e.img[0]} />
                            </Link>
                        </div>

                    </div>
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-12">
                                <Link className="f16" to={"/product/"+e.product.route}>{e.product.name}</Link>
                            </div>
                            {
                                    (!$.isEmptyObject(e.option)) ?
                                            <div className="col-md-12">
                                                {
                                                    e.option.map((option,k)=>
                                                        <span key={"option_"+k}>
                                                            <span className="colorGrey f14 b">{option.option.name}: </span>
                                                            <span>{option.option.option_id == 2 ? <span style={{display : "inline-block",height : 15,width : 15,background : option.option.value}}></span> : option.option.value} </span>
                                                        </span>
                                                    )
                                                }
                                            </div>
                                            : ""
                            }
                            <div className="col-md-3">
                                X {e.qty}
                            </div>
                            <div className="col-md-9 text-right pd0">
                                = <b className="f14">{Helper.format_curency(e.product.price*e.qty)} VND</b>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return xhtml_cart;
    }
    loadListShip(){
        fetch(Helper.apiUrl()+"api/v1/customer/getInfoShipping?"+$.param({"id" : this.state.customer.id}),{
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
                        <div className="col-md-4 mgb10" key={k+"_dfsafads"}>
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
                        <div className="col-md-4 mgb10" key={+"test_dfsafads"}>
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
    deleteAddress(e){
        this.props.openLoading()
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: "Bearer "+this.state.token,
        }
        // axios.defaults.headers.common["Authorization"] =  "Bearer "+this.state.token;
        axios.delete(Helper.apiUrl()+"api/v1/customer/deleteAddress?id="+e.id)
        .then(reponse=>{
            this.props.closeLoading()
            this.loadListShip();
            this.chooseShipAddAddress();
            // this.props.closeLoading();
            // this.props.clearCart();
            // this.props.history.push('/customer/success')
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
    async completeOrder(){
        this.props.openLoading()
        let order = {
            customer_id : this.state.customer.id,
            ship_id : this.state.ship_id,
            total : this.state.total,
            payment_at_home : this.state.paymentAtHome,
        }
        let order_detail = [];
        this.props.carts.map((e)=>
            order_detail.push({product_id : e.product.id,price : (e.product.price*e.qty),qty : e.qty,option : JSON.stringify(e.option)})
        )
        if(this.state.ship_id == null || this.state.ship_id == "" || this.state.ship_id == 0){
            let xhtml_err = <div className="col-12 error-message"><FontAwesomeIcon icon={faExclamationTriangle} /> Bạn chưa có thông tin ship hàng xin hãy chọn</div>;
            this.setState({
                errorConfirm : xhtml_err
            })
            this.props.closeLoading()
        }else{
            axios.defaults.headers = {
                'Content-Type': 'application/json',
                Authorization: "Bearer "+this.state.token,
            }
            // axios.defaults.headers.common["Authorization"] =  "Bearer "+this.state.token;
            await axios.post(Helper.apiUrl()+"api/v1/customer/addOrder",JSON.stringify({order : order,order_detail : order_detail}),{
                headers: {
                    'Content-Type' : 'application/json',
                    "Access-Control-Allow-Origin" : "*",
                    "access-control-allow-origin" : "*",
                    "Access-Control-Allow-Headers" : 'Origin, X-Requested-With, Content-Type, Accept',
                    // 'Origin' : Helper.apiUrl()
                }
                // headers: headers,
            })
            .then(reponse=>{
                this.props.closeLoading();
                this.props.clearCart();
                this.props.history.push('/checkout/success')
            }).catch(error=>{
                if(error.response.status == 401){
                    this.props.Logout();
                    setCookie("error_login",JSON.stringify({redirect : '/checkout/cart',msg : "Thời gian đăng nhập hết hạn, bạn phải đăng nhập lại"}))
                    this.props.history.push('/customer/login.html')
                    return false;
                }
            })
        }

    }
    componentWillReceiveProps(){
        let total = 0;
        Object.keys(this.props.carts).map(e => {
            total += this.props.carts[e].qty*this.props.carts[e].product.price
        });
        this.setState({
            total : total
        })
    }
    render() {
        let {carts} = this.props;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-9">
                        <div className="row mgb20">
                            <div className="col-md-12">
                                <h3 className="colorGrey ls01">HÌNH THỨC THANH TOÁN</h3>
                            </div>
                            <div className="col-md-12">
                                <div className="box-payment">
                                    <div className="row mgb20">
                                        <div className="col-md-12">
                                            <div className="left mgr10">
                                                <input type="radio" value={true} name="hinhthuc" checked={this.state.paymentAtHome} onChange={this.handleChange}/>
                                            </div>
                                            <div className="left lh1 ls01">
                                                Thanh toán khi nhận hàng
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="left mgr10">
                                                <input type="radio" value={false} name="hinhthuc" checked={!this.state.paymentAtHome} onChange={this.handleChange}/>
                                            </div>
                                            <div className="left lh1 ls01">
                                                Chuyển khoản
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-md-12">
                                <h3 className="colorGrey ls01">THÔNG TIN NHẬN HÀNG</h3>
                            </div>
                            <div className="col-md-12">
                                <div className="box-payment">
                                    <div className="row mgb20">
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
                    </div>
                    <div className="col-md-3">
                        <div className="row ">
                            <div className="col-md-12">
                                <h3 className="colorGrey ls01">THÔNG TIN GIỎ HÀNG</h3>
                            </div>
                            <div className="col-md-12">
                                <div className="box-info-cart">
                                    <div className={(this.state.errorConfirm) ? 'row block' : 'row none'}>
                                        {this.state.errorConfirm}
                                    </div>
                                    {this.loadTemplateCart(carts)}
                                    <hr />
                                    <div className="row mgb20">
                                        <div className="col-md-6 pd0">
                                            <span className="f18 font-weight-bold">Tổng tiền</span>
                                        </div>
                                        <div className="col-md-6 text-right pd0">
                                            <span className="color f18 font-weight-bold">{Helper.format_curency(this.state.total)} VND</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 pd0">
                                            <button onClick={()=> this.completeOrder()} className="btn-box w100" style={{maxWidth : "unset"}}>HOÀN TẤT ĐƠN HÀNG</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        );
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
  export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
