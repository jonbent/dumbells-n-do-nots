import React, { Component } from 'react';
import BottomNavBar from '../navbar/BottomNavBarContainer';
import '../../scss/users/UserShow.scss';
import UserShowCard from './UserShowCard';
import Modal from "../modal/Modal";
import RoutineShow from "../routine/RoutineShowContainer";
import FiltersModal from "../modal/FiltersModal";
class UserShow extends Component {
    // constructor(props) {
    //     super(props);
    // }
    componentDidMount() {
        if (this.props.match.params.username){
            this.props.fetchUserInfo(this.props.match.params.username)
        }
        this.props.fetchRoutineData(this.props.user._id);
    }
    
    
    render(){
        const {user} = this.props;
        return(
            <div className="user-show-container">
                <Modal/>
                <FiltersModal/>
                <div className="user-show-content">
                    <UserShowCard user={user}/>
                    <div className="routine-info-container">
                        <RoutineShow/>
                    </div>
                </div>
                <BottomNavBar user={user}/>
            </div>
        )
    }
}
export default UserShow