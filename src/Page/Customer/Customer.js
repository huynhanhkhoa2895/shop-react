import React from 'react';
import './Customer.css';
import { Link } from 'react-router-dom';
import Helper from '../../lib/Helper' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle,faSpinner } from '@fortawesome/free-solid-svg-icons'
import {setCookie,getCookie,removeCookie,clearCookie} from '../../Widget/Cookie/Cookie.js'
class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // customer: getCookie("customer"),
            // token: getCookie("token"),
        };
        // if(getCookie("customer") == null || getCookie("token") == null){
        //     clearCookie();
        //     this.props.history.push('/customer/login.html')
        // }
    }
    componentDidMount(){

        // fetch(Helper.apiUrlLocal()+"api/v1/customer/getInfo",{
        //     headers : {
        //         "Authorization" : "Bearer "+this.state.token,
        //     }
        // })
        // .then(res => {
        //     if(res.status == 401){
        //         removeCookie("customer")
        //         removeCookie("token")
        //         this.props.history.push('/customer/login.html')
        //     }else{
        //         res.json()
        //     }
        // })
        // .then(
        //   (result) => {
        //     console.log(result);
        //   },
        //   (error) => {
        //     this.setState({
        //       isLoaded: true,
        //       error
        //     });
        //   }
        // )
    }
    render(){
        return(
            <>
            </>
            // <div className="container-fluid">
            //     MY ACCOUNT
            // </div>
        )
    }
}
export default Customer;