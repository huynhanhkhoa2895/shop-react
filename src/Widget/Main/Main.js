import React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink,Switch } from 'react-router-dom';
import Home from '../../Page/Home/Home.js'
import Category from '../../Page/Category/Category.js'
import Login from '../../Page/Customer/Login.js'
import Customer from '../../Page/Customer/Customer.js'
import Register from '../../Page/Customer/Register.js'
import Checkout from '../../Page/Checkout/Checkout.js'
import Cart from '../../Page/Checkout/Cart.js'
import NotFound from '../../Page/NotFound.js'
import ProductView from '../../Page/ProductView/ProductView.js';
import PrivacyPolicy from '../../Page/Policy/PrivacyPolicy.js';
class Main extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        menus : [],
      };
    }
    render() {
        return (
          <Switch>
            <Route path={"/customer"} exact={true} component={Customer} />
            <Route path={"/customer/login.html"} exact={true} component={Login} />
            <Route path={"/customer/register.html"} exact={true} component={Register} />

            <Route path={"/checkout/cart"} exact={true} component={Cart} />
            <Route path={"/checkout/payment"} exact={true} component={Checkout} />

            <Route path={"/category/:route"} exact={true} component={Category} />
            <Route path={"/product/:route"} exact={true} component={ProductView} />
            <Route path={"/"} exact={true} component={Home}/>   

            <Route path={"/privacy-policy"} exact={true} component={PrivacyPolicy} />

            <Route component={NotFound}/>         
          </Switch>
        );
      }
}

export default Main;

