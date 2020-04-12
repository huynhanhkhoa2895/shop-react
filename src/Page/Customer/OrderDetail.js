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
import Datable from '../../Widget/Datatable/Datatable'

class OrderDetail extends React.Component {
    constructor(props) {
        const customer = getCookie("customer");   
        const token =   getCookie("token");
        super(props);
        this.state = {
            customer: customer,
            token: token,
            product : [],
            xhtml_order : null,
            err : null,
            order_id : this.props.match.params.id,
        }
        this.choosePage = this.choosePage.bind(this)
        this.getProductItem = this.getProductItem.bind(this)
    }
    componentDidMount(){
        fetch(Helper.apiUrlLocal()+"api/v1/customer/getOrderDetail?customer_id="+this.state.customer.id+"&order_id="+this.state.order_id,{headers : {"Authorization" : "Bearer "+this.state.token,}})
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
              if(result.err == 0){
                this.setState({
                    product : result.product
                })
              }else{
                this.setState({
                    err : result.msg
                })
              }

            this.getProductItem()
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
        this.getProductItem(page)
    }
    getProductItem(page=1){
        if(this.state.product.length > 0){
            let data = 
            {
                "Sản phẩm" : {
                    type : "product",
                    value  : "product"
                },
                "Nhãn hàng" : {
                    type : "text",
                    value  : "brand_name"
                },
                "Thể loại" : {
                    type : "text",
                    value  : "category_name"
                },
                "Tổng giá" : {
                    type : "total",
                    value  : "order_price"
                },
                "Số lượng mua" : {
                    type : "text",
                    value  : "order_qty"
                },

            }
            this.setState({
                xhtml_order : <Datable tbody={data} data={this.state.product} page={page} each={5} choosePage={this.choosePage} />
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
                        {(this.state.product.length > 0) ?
                            this.state.xhtml_order
                        :
                        <h3 className="text-center colorGrey">{this.state.err}</h3>
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
export default connect(null, mapDispatchToProps)(OrderDetail);
