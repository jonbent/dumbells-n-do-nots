import React from 'react'
import '../../scss/users/UserShowCard.scss'
const UserShowCard = ({user}) => {
    return (
        <div className="user-show-card">
            <div className="user-card-avatar" style={{ backgroundImage: `url(${user.avatarUrl})`}}>

            </div>

            <div className="user-card-info">
                <div className="user-info">
                    {user.username}
                </div>
                <div className="user-info">
                    {Math.floor(user.height / 12)} ft {user.height % 12} in
                </div>
                <div className="user-info">
                    Current: {user.weightCur} lbs
                </div>
                <div className="user-info">
                    Lost {user.weightStart - user.weightCur} lbs since joined
                </div>
            </div>
        </div>
    )
}

export default UserShowCard
