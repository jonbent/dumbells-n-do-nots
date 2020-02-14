import React from 'react'
import Settings from '../svg/Settings'
import Plus from '../svg/Plus'
// import HeartOutline from '../svg/HeartOutline'
import History from '../svg/History'

import {NavLink} from 'react-router-dom'

export default class BottomNavBar extends React.Component{
    // constructor(props){
    //     super(props)
    // }

    render(){
        const {user, location} = this.props;
        return (
            <div className="bottom-navbar-container">
                <div className="bottom-navbar">
                    <div>
                        <NavLink exact to={location.pathname === "/settings" ? "/" : `/settings`} className={location.pathname === "/settings" ? "active" : ``}>
                            <Settings/>
                        </NavLink>
                    </div>
                    <div>
                        <button onClick={() => this.props.openNewRoutineModal()}>
                            <Plus/>
                        </button>
                    </div>
                    <div>
                        <NavLink to={`/users/${user.username}/history`}>
                            <History/>
                        </NavLink>
                    </div>
                    {/*<div>*/}
                    {/*    <button onClick={() => this.props.testMuscleGroupsSelector()}>*/}
                    {/*        <History/>*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }
}



