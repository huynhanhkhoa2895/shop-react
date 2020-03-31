import React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink,Switch } from 'react-router-dom';
import Home from '../../Page/Home/Home.js'
import Category from '../../Page/Category/Category.js'
import Login from '../../Page/Customer/Login.js'
import Customer from '../../Page/Customer/Customer.js'
import Register from '../../Page/Customer/Register.js'
import NotFound from '../../Page/NotFound.js'
import ProductView from '../../Page/ProductView/ProductView.js';
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
            <Route path={"/category/:route"} exact={true} component={Category} />
            <Route path={"/product/:route"} exact={true} component={ProductView} />
            <Route path={"/"} exact={true} component={Home}/>   
            <Route component={NotFound}/>         
          </Switch>
        );
      }
}

export default Main;

