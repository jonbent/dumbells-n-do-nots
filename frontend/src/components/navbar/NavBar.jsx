import React from 'react'
import '../../scss/NavBar.scss'
import Hamburger from "../svg/Hamburger";
import {connect} from 'react-redux';
import {openHamburger} from "../../actions/HamburgerActions";
import {logout} from "../../actions/SessionActions";
const NavBar = ({openHamburger, logout, currentUser}) => {
    return (
        <div className="navbar-container">
            <div className="navbar">
                <div className="hamburger">
                    <Hamburger onClick={openHamburger}/>
                </div>
                <div className="navbar-logo">
                    {/* <img src="/images/donut-dumbbell-full-logo.png" alt=""/> */}
                </div>
                {/* <div className="navbar-name"><h3>Dumbells-N-Do Nots</h3></div> */}
                <div className="action-container">
                    {!!currentUser && <button className='logout-button' onClick={logout}>Logout</button>}
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = ({session}) => ({
    currentUser: session.user,
})
const mapDispatchToProps = (dispatch) => ({
    openHamburger: ()=> dispatch(openHamburger()),
    logout: ()=> dispatch(logout())
})
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
