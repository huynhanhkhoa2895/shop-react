import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
class MinicartItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value : 0,
            info : this.props.info
        };
        this.handleChange = this.handleChange.bind(this);
        this.removeItemInCart = this.removeItemInCart.bind(this);
        this.updateItemInCart = this.updateItemInCart.bind(this)
      }
    handleChange(event) {
        const target = event.target; 
        const value  = target.value;
        const name   = target.name;
        this.setState({
            [name]: value
        })
    }
    removeItemInCart(){
        this.props.removeItemInCart(this.props.info.product.id)
    }
    updateItemInCart(){
        this.props.updateItemInCart(this.props.info.product.id,(this.state.value !== 0) ? this.state.value : this.props.info.qty)
    }
    render(){
        let {info} = this.props;
        let quantity          = (this.state.value !== 0) ? this.state.value : info.qty;
        return (
            <div className="row minicart-box">
                <div className="col-md-6 ">
                    <div className="minicart-img">
                        <img src={window.location.origin+'/product/'+info.img[0]} alt={info.product.name} />                  
                    </div>
                </div>
                <div className="col-md-6 minicart-content pd0">
                    <ul>
                        <li><h4><Link  to={"product/"+info.product.route} className="color">{info.product.name}</Link></h4></li>
                        <li><span className="colorGrey">Nhãn hiệu : </span>{info.product.brand_name}</li>
                        <li><span className="colorGrey">Loại : </span>{info.product.category_name}</li>
                        <li>
                        <div className="row">
                            <div className="col-4" style={{paddingLeft : 0}}><input name="value" style={{display: 'block',width: '100%',height: '100%',textAlign: 'center'}} value={quantity} pattern="[0-9]*" inputMode="numeric" onChange={this.handleChange}/></div>
                            <div className="col-4 pd0"><button className="background colorW" style={{padding : "5px"}} onClick={this.updateItemInCart}>Update</button></div>
                            <div className="col-4 text-center" style={{lineHeight : "1.8"}} onClick={this.removeItemInCart}><FontAwesomeIcon icon={faTrash} className="color"/></div>
                        </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
        
    }
}
export default MinicartItem;