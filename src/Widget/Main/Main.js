import React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink,Switch } from 'react-router-dom';
import Home from '../../Page/Home/Home.js'
import Category from '../../Page/Category/Category.js'
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
            <Route path={"/category/:route"} exact={true} component={Category} />
            <Route path={"/product/:route"} exact={true} component={ProductView} />
            <Route path={"/"} exact={true} component={Home}/>   
            <Route component={NotFound}/>         
          </Switch>
        );
      }
}

export default Main;

