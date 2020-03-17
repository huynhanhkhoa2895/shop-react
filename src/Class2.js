import React from 'react';
import {connect} from 'react-redux';
class Class2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value : "Class 2",
            items : this.props.items
        }
    }
    getStageClass2(){
        return this.state.value
    }
    render() {
        let {minicart} = this.props;
        return (
            <div className="row">
                <div className="col-6">
                    {this.openMinicart(minicart)}
                </div>
            </div>
        );
    }
    openMinicart(minicart){
        console.log("openMinicart",minicart)
    }
}
const mapStateToProps = state => {
    return {
        minicart: state.minicart,
        cart : state.notify2
    }
}
// const mapDispatchToProps = state => {
//     return {
//         items: state.carts
//     }
// }
export default connect(mapStateToProps, null)(Class2);