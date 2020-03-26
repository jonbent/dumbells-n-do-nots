import React, {Component} from 'react';
import '../../scss/users/UserHistory.scss'
// import BottomNavBar from "../navbar/BottomNavBarContainer";
import Modal from "../modal/Modal";
import DateFormat from 'dateformat'
import FiltersModal from "../modal/FiltersModal";
import Alert from "../alerts/Alert";

// import {Link } from 'react-router-dom';
import NavBar from "../navbar/NavBar";

class UserHistory extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }
    componentDidMount() {
        this.props.fetchUserInfo().then(() => this.props.fetchUserRoutines(this.props.user._id));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.user && prevProps.user && prevProps.user._id !== this.props.user._id) this.props.fetchUserInfo().then(() => this.props.fetchUserRoutines(this.props.user._id));
    }

    handleSelect(routine){
        this.props.receiveSelectedRoutine(routine);
        return null;
    }

    render(){
        const {routines, days} = this.props;
        return (
            <div className="user-history-container">
                <Modal/>
                <Alert/>
                <FiltersModal/>
                <NavBar/>
                <div className="UserHistory">
                    <div className="routine-history">
                        <div className="history-title">
                            History
                        </div>
                        {routines.length === 0 && <div>
                            No Routines Found
                        </div>}
                        {routines.map(r => {
                            const startDate = new Date(days[r._id][0].date);
                            const endDate =  new Date(startDate.getTime());
                            endDate.setDate(endDate.getDate() + 7);
                            return (
                                <div key={r._id} className="routine-item" onClick={() => this.handleSelect(r)}>
                                    <div>{DateFormat(startDate, 'mm/dd/yyyy')}</div>
                                    <div>{DateFormat(endDate, 'mm/dd/yyyy')}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/*<BottomNavBar user={currentUser}/>*/}
            </div>
        );
    }

};

export default UserHistory;