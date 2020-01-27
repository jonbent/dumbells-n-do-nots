import React, { Component } from 'react';
import BottomNavBar from '../navbar/BottomNavBarContainer';
import '../../scss/users/UserShow.scss';
import UserShowCard from './UserShowCard';

class UserShow extends Component {
    // constructor(props) {
    //     super(props);
    // }
    componentDidMount() {
        if (this.props.match.params.username){
            this.props.fetchUserInfo(this.props.match.params.username)
        }
    }
    
    
    render(){
        const {user} = this.props
        return(
            <div className="user-show-container">
                <div className="user-show-content">
                    <UserShowCard user={user}/>
                </div>
                <BottomNavBar user={user}/>
            </div>
        )
    }
}
export default UserShow