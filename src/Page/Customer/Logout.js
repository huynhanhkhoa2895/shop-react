import React from 'react';
import './Customer.css';
import {connect} from 'react-redux';
import {clearCookie} from '../../Widget/Cookie/Cookie.js'
import { Link } from 'react-router-dom';

class Logout extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.Logout();
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="colorGrey text-center">BẠN ĐÃ ĐĂNG XUẤT THÀNH CÔNG</h3>
                        <h5 className="colorGrey text-center">BẤM <Link to="/">VÀO ĐÂY</Link> ĐỂ VỀ TRANG CHỦ</h5>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
      verify: state.isLogin,
    }
  }
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        Logout : ()=>{
            dispatch({type : 'LOGOUT'})
          },
    }
}
  export default connect(mapStateToProps, mapDispatchToProps)(Logout);
    