import React from 'react'
import '../../scss/users/UserShowCard.scss'
const UserShowCard = ({user}) => {
    return (
        <div className="user-show-card">
            <div className="user-card-avatar" style={{backgroundImage: `url(${user.avatarImg})`}}>

            </div>
        </div>
    )
}

export default UserShowCard
