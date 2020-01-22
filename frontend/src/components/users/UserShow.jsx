import React, { Component } from 'react'
import BottomNavBar from '../navbar/BottomNavBar'
import '../../scss/UserShow.scss'
class UserShow extends Component {
    render(){
        return(
            <div className="user-show-container">
                <div className="user-show-content">
                </div>
                <BottomNavBar user={this.props.user}/>
            </div>
        )
    }
}
export default UserShow