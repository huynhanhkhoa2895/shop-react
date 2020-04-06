import React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink,Switch } from 'react-router-dom';
import Home from '../../Page/Home/Home.js'
import Category from '../../Page/Category/Category.js'
import Login from '../../Page/Customer/Login.js'
import Customer from '../../Page/Customer/Customer.js'
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

class Main extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        menus : [],
      };
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
              <Route path={"/customer"} exact={true} component={Customer} />
              <Route path={"/customer/login.html"} exact={true} component={Login} />
              <Route path={"/customer/register.html"} exact={true} component={Register} />

              <Route path={"/checkout/cart"} exact={true} component={Cart} />
              <Route path={"/checkout/success"} exact={true} component={Success} />
              <Route path={"/checkout/payment"} exact={true} component={Checkout} />

              <Route path={"/category/:route"} exact={true} component={Category} />
              <Route path={"/product/:route"} exact={true} component={ProductView} />
              <Route path={"/"} exact={true} component={Home}/>   

              <Route path={"/privacy-policy"} exact={true} component={PrivacyPolicy} />

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
export default connect(mapStateToProps, null)(Main);
