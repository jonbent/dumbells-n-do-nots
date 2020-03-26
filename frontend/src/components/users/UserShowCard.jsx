import React from 'react'
import '../../scss/users/UserShowCard.scss'
const UserShowCard = ({user}) => {
    return (
        <div className="user-show-card">
            <div className="user-card-avatar" style={{ backgroundImage: `url(${user.avatarUrl})`}}>

            </div>

            <div className="user-card-info">
                <div className="user-info">
                    Username:
                    <br/>
                    <br/>
                    {user.username}
                </div>
                <div className="user-info">
                    Height:
                    <br/>
                    <br/>
                    {Math.floor(user.height / 12)} ft {user.height % 12} in
                </div>
                <div className="user-info">
                    Current Weight:
                    <br/>
                    <br/>
                    {user.weightCur} lbs
                </div>
                <div className="user-info">
                    Lost {user.weightStart - user.weightCur} lbs since joining
                    <br/>
                    <br/>
                    Dumbells N' Donuts
                </div>
            </div>
        </div>
    )
}

export default UserShowCard
