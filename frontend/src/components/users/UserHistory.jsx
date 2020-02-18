import React, {Component} from 'react';
import '../../scss/users/UserHistory.scss'
import BottomNavBar from "../navbar/BottomNavBarContainer";
import Modal from "../modal/Modal";
import DateFormat from 'dateformat'
class UserHistory extends Component {
    componentDidMount() {
        this.props.fetchUserInfo().then(() => this.props.fetchUserRoutines(this.props.user._id));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.user && prevProps.user && prevProps.user._id !== this.props.user._id) this.props.fetchUserInfo().then(() => this.props.fetchUserRoutines(this.props.user._id));
    }

    render(){
        const {currentUser, routines, days} = this.props;
        return (
            <div className="user-history-container">
                <Modal/>
                <div className="UserHistory">
                    <div className="routine-history">
                        <div className="history-title">
                            History
                        </div>
                        {routines.length === 0 && <div>
                            No Routines Found
                        </div>}
                        {routines.map(r => {
                            return (
                                <div key={r._id} className="routine-item">
                                    <div>{DateFormat(new Date(days[r._id][0].date), 'yyyy-mm-dd')}</div>
                                    <div>{DateFormat(new Date(days[r._id][days[r._id].length - 1].date), 'yyyy-mm-dd')}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <BottomNavBar user={currentUser}/>
            </div>
        );
    }

};

export default UserHistory;