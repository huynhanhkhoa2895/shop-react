import React from 'react';
import './Customer.css';
import {connect} from 'react-redux';
class Logout extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.Logout();
        setTimeout(()=>{
            this.props.history.push("/");
        },4000)
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3>BẠN ĐÃ ĐĂNG XUẤT THÀNH CÔNG</h3>
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
            dispatch({type : 'Logout'})
          },
    }
}
  export default connect(mapStateToProps, mapDispatchToProps)(Logout);
    