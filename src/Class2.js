import React from 'react';
import {connect} from 'react-redux';
class Class2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value : "Class 2"
        }
    }
    getCart(){
        console.log("CART");
    }
    getStageClass2(){
        return this.state.value
    }
    render() {
        return (
            <div className="row">
                <div className="col-6"><button>CLICK 2</button></div>
                <div className="col-6">{this.state.value}</div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        items: state.carts
    }
}
const mapDispatchToProps = state => {
    return {
        items: state.carts
    }
}
export default connect(null, mapDispatchToProps)(Class2);