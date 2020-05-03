import React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink,Switch } from 'react-router-dom';
import ScrollToTop from '../../Widget/ScrollToTop/ScrollToTop'
import Home from '../../Page/Home/Home.js'
import Category from '../../Page/Category/Category.js'
import Login from '../../Page/Customer/Login.js'
import Logout from '../../Page/Customer/Logout.js'
import Customer from '../../Page/Customer/Customer.js'
import Order from '../../Page/Customer/Order.js'
import OrderDetail from '../../Page/Customer/OrderDetail.js'
import Address from '../../Page/Customer/Address.js'
import Register from '../../Page/Customer/Register.js'
import Checkout from '../../Page/Checkout/Checkout.js'
import Success from '../../Page/Checkout/Success.js'
import Cart from '../../Page/Checkout/Cart.js'
import NotFound from '../../Page/NotFound.js'
import ProductView from '../../Page/ProductView/ProductView.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import PrivacyPolicy from '../../Page/Policy/PrivacyPolicy.js';
import {connect} from 'react-redux';
import {setCookie,getCookie,removeCookie,clearCookie} from '../../Widget/Cookie/Cookie.js'
import Helper from '../../lib/Helper'

class Main extends React.Component {
    constructor(props){
      const customer = getCookie("customer");
      const token = getCookie("token");
      super(props);
      this.state = {
        menus : [],
        customer : customer,
        token : token,
      };
    }
    componentWillMount(){
      if(this.state.customer != null){
          fetch(Helper.apiUrl()+"api/v1/customer/getInfo?id="+this.state.customer.id,{
            headers : {
                "Authorization" : "Bearer "+this.state.token,
            },
        })
        .then(res => {
            if(res.status == 401){
                this.props.Logout();
                return false;
            } 
            return res.json()
        })
      }

    }
    render() {
        return (
          <>
            <div className={"loading-all "+ (this.props.loading.openLoading ? "block" : "none")}>
              <div style={{textAlign : "center",marginTop : "calc(15% - 35px)"}}>
                <FontAwesomeIcon className="icon-loading" icon={faSpinner} spin size="4x"/>
              </div>
            </div>
            <Switch>
              {/* <ScrollToTop /> */}
              <Route onUpdate={() => window.scrollTo(0, 0)} path={"/customer"} exact={true} component={Customer} />
              <Route onUpdate={() => window.scrollTo(0, 0)} path={"/customer/info"} exact={true} component={Customer} />
              <Route onUpdate={() => window.scrollTo(0, 0)} path={"/customer/order"} exact={true} component={Order} />
              <Route onUpdate={() => window.scrollTo(0, 0)} path={"/customer/address"} exact={true} component={Address} />
              <Route onUpdate={() => window.scrollTo(0, 0)} path={"/customer/login.html"} exact={true} component={Login} />
              <Route onUpdate={() => window.scrollTo(0, 0)} path={"/customer/logout"} exact={true} component={Logout} />
              <Route onUpdate={() => window.scrollTo(0, 0)} path={"/customer/register.html"} exact={true} component={Register} />
              <Route onUpdate={() => window.scrollTo(0, 0)} path={"/customer/order/:id"} exact={true} component={OrderDetail} />

              <Route onUpdate={() => window.scrollTo(0, 0)} path={"/checkout/cart"} exact={true} component={Cart} />
              <Route onUpdate={() => window.scrollTo(0, 0)} path={"/checkout/success"} exact={true} component={Success} />
              <Route onUpdate={() => window.scrollTo(0, 0)} path={"/checkout/payment"} exact={true} component={Checkout} />

              <Route onUpdate={() => window.scrollTo(0, 0)} path={"/category/:route"} exact={true} component={Category} />
              <Route onUpdate={() => window.scrollTo(0, 0)} path={"/product/:route"} exact={true} component={ProductView} />
              <Route onUpdate={() => window.scrollTo(0, 0)} path={"/"} exact={true} component={Home}/>   

              <Route onUpdate={() => window.scrollTo(0, 0)} path={"/privacy-policy"} exact={true} component={PrivacyPolicy} />

              <Route component={NotFound}/>         
            </Switch>
          </>
        );
      }
      
}
const mapStateToProps = state => {
  return {
    loading: state.loading,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {

        Logout : ()=>{
          dispatch({type: 'LOGOUT'})
        }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
