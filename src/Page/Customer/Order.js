import React from 'react';
import LeftNavigation2 from '../../Widget/LeftNavigation/LeftNavigation2.js'
import {setCookie,getCookie,removeCookie,clearCookie} from '../../Widget/Cookie/Cookie.js'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle,faSpinner,faPlusCircle,faTimes } from '@fortawesome/free-solid-svg-icons'
import './Customer.css';
import {connect} from 'react-redux';
import Helper from '../../lib/Helper'
import Datable from '../../Widget/Datatable/Datatable'

class Order extends React.Component {
    constructor(props) {
        const customer = getCookie("customer");   
        const token =   getCookie("token");
        super(props);
        this.state = {
            customer: customer,
            token: token,
            order : [],
            xhtml_order : null,
        }
        this.choosePage = this.choosePage.bind(this)
        this.getOrderItem = this.getOrderItem.bind(this)
    }
    componentDidMount(){
        fetch(Helper.apiUrl()+"api/v1/customer/getOrder?id="+this.state.customer.id,{headers : {"Authorization" : "Bearer "+this.state.token,}})
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
                order : result
            })
            this.getOrderItem()
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
    choosePage(page){
        this.getOrderItem(page)
    }
    getOrderItem(page=1){
        if(this.state.order.length > 0){
            let data = 
                {
                    "Order Id" : {
                        type : "text",
                        value  : "id"
                    },
                    "Ngày tạo" : {
                        type : "text",
                        value  : "created_at"
                    },
                    "Tổng tiền" : {
                        type : "total",
                        value  : "total"
                    },
                    "Xem chi tiết" : {
                        type : "link",
                        value  : "Xem chi tiết",
                        href : "/customer/order/",
                        param : "id"
                    }
                }
            this.setState({
                xhtml_order : <Datable tbody={data} data={this.state.order} page={page} each={5} choosePage={this.choosePage} />
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
                        {(this.state.order.length > 0) ?
                            this.state.xhtml_order
                        :
                            <h3 className="text-center colorGrey">Hiện tại bạn không có đơn hàng nào</h3>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
          Logout : ()=>{
            dispatch({type: 'LOGOUT'})
          }
    }
}
export default connect(null, mapDispatchToProps)(Order);
