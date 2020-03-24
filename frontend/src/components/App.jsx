
import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/RouteUtil';
import { Switch } from 'react-router-dom';
import SignupContainer from './signup/signup_container';
import LoginContainer  from './login/LoginContainer';
import UserShowContainer  from './users/UserShowContainer';
import UserHistory  from './users/UserHistoryContainer';
import SettingsContainer  from './settings/SettingsContainer';
import { connect } from 'react-redux';

import Splash from './home/Splash';

import '../scss/reset.scss';
import '../scss/App.scss';
import Hamburger from "./modal/Hamburger";
import {closeHamburger} from "../actions/HamburgerActions";

const App = ({ loggedIn, hamburger, closeHamburger }) => (
    <div className={`App ${hamburger ? "slide-out" : ""}`}>
        <Switch>
            <AuthRoute exact path="/signup" component={SignupContainer} />
            <AuthRoute exact path="/login" component={LoginContainer} />
            {!loggedIn && <AuthRoute exact path="/" component={Splash} />}
            <ProtectedRoute exact path="/settings" component={SettingsContainer} />}
            <ProtectedRoute exact path="/users/:username/history" component={UserHistory}/>
            {loggedIn &&  <ProtectedRoute path="/" component={UserShowContainer} />}
        </Switch>

        {hamburger && <div className="overlay" onClick={closeHamburger}></div>}
    </div>
);

const mapStateToProps = state => (
  {
      loggedIn: state.session.isAuthenticated,
      hamburger: state.ui.hamburger
  }
);
const mapDispatchToProps = dispatch => ({
    closeHamburger: () => dispatch(closeHamburger())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);