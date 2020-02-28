import {connect} from 'react-redux';
import React, {Component} from 'react';
import '../../scss/Alert.scss'
import {clearAlert} from "../../actions/AlertActions";
class Alert extends Component{
    constructor(props) {
        super(props);
        this.state = {
            alert: false
        }
        this.handleCloseAlert = this.handleCloseAlert.bind(this)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.alert !== this.props.alert && this.props.alert.status !== "none" && this.state.alert === false) {
            this.setState({
                alert: true
            })
        }
    }
    handleCloseAlert(){
        this.setState({
            alert: false
        }, () => setTimeout(this.props.clearAlert, 500));
    }

    render(){
        const {alert} = this.props;
        const {message = "", status} = alert;
        const displaying = this.state.alert;
        let className = null;
        switch(status){
            case "success":
                className = "success";
                break;
            case "fail":
                className = "fail";
                break;
            default:
                className = "";
                break;
        }
        let translateVal = "-100%";
        if (!!displaying) translateVal = '0';
        return (
            <div className="alert-container" style={{transform: `translateY(${translateVal})`}}>
                <div className={`alert ${className}`}>
                    <div>{message}</div>
                    <div className='confirm' onClick={this.handleCloseAlert}>Confirm</div>
                </div>

            </div>
        )
    }
};

const mapStateToProps = ({ui}) => ({
    alert: ui.alert
})
const mapDispatchToProps = (dispatch) => ({
    clearAlert: () => dispatch(clearAlert())
})


export default connect(mapStateToProps, mapDispatchToProps)(Alert);