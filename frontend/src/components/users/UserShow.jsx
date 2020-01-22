import React, { Component } from 'react'
import BottomNavBar from '../navbar/BottomNavBar'
import '../../scss/UserShow.scss'
import UserShowCard from './UserShowCard'
class UserShow extends Component {
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