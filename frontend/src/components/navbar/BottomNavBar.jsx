import React from 'react'
import Settings from '../svg/Settings'
import Plus from '../svg/Plus'
import HeartOutline from '../svg/HeartOutline'
import History from '../svg/History'

import {NavLink, withRouter} from 'react-router-dom'

export default class BottomNavBar extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const {user} = this.props
        return (
            <div className="bottom-navbar-container">
                <div className="bottom-navbar">
                    <div>
                        <NavLink exact to={`/users/${user.username}`}>
                            <Settings/>
                        </NavLink>
                    </div>
                    <div>
                        <a onClick={() => this.props.openNewRoutineModal()}>
                            <Plus/>
                        </a>
                    </div>
                    <div>
                        <NavLink to={`/users/${user.username}/favorites`}>
                            <HeartOutline/>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to={`/users/${user.username}/history`}>
                            <History/>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}



