import React from 'react';
import {connect} from 'react-redux';

class Notify extends React.Component {
    render() {
        return (
            <div className="alert alert-success" role="alert" id="mnotification">
            	<b>Đang test {this.props.notifys}</b>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        notifys: state.notify
    }
}

export default connect(mapStateToProps, null)(Notify);