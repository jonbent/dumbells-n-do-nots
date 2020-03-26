import {connect} from 'react-redux';
import React from 'react';

import '../../scss/Hamburger.scss';
import {Link, withRouter, NavLink} from "react-router-dom";
import {logout} from "../../actions/SessionActions";
import {closeHamburger} from "../../actions/HamburgerActions";
import {openModal} from "../../actions/ModalActions";

const Hamburger = ({openStatus, loggedIn, user, logout, closeHamburger, location, openNewRoutineModal}) => {
    const splitLocation = location.pathname.split('/');
    return (
        <div className={`Hamburger ${openStatus ? "slide-in" : ""}`}>
            <div className="absolute-hamburger">
                {loggedIn && <div className="user-card">
                    <div className="user-avatar">
                        <img src={user.avatarUrl} alt={user.username}/>
                    </div>
                    <div className="username-container">
                        <div className="username">{user.username}</div>
                        <span className="view-profile">
                            <Link to={`/settings`} onClick={closeHamburger}>
                                View Profile
                            </Link>
                        </span>
                    </div>
                </div>}
                {!loggedIn && <div className="session-actions-container">
                    <div className="session-actions">
                        <Link to="/login">
                            <button className="login">Log in</button>
                        </Link>
                        <Link to="/signup">
                            <button className="signup">Sign up</button>
                        </Link>
                    </div>
                </div>}
                <div className="site-links">
                    <NavLink exact to="/">Home</NavLink>
                    {!!loggedIn && <NavLink to={splitLocation[3] === "history" ? "/" : `/users/${user.username}/history`}>
                        History
                    </NavLink>}
                    {!!loggedIn && <div>
                        <button onClick={openNewRoutineModal}>
                            Add New Routine
                        </button>
                    </div>}
                    {!!loggedIn && <Link to="/" onMouseDown={logout}>Logout</Link>}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({entities, ui, session}) => {
    let userObjectKeysLength = 0;
    if (typeof session.user === "object") userObjectKeysLength = Object.keys(session.user).length;
    return {
        openStatus: ui.hamburger,
        loggedIn: Boolean(!!userObjectKeysLength),
        user: session.user
    }
};

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
    closeHamburger: () => dispatch(closeHamburger()),
    openNewRoutineModal: () => dispatch(openModal('addRoutine')),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Hamburger));