
import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/RouteUtil';
import {Outlet, Route, Routes} from 'react-router-dom';
import SignupContainer from './signup/signup_container';
import LoginContainer  from './login/LoginContainer';
import UserShow  from './users/UserShow';
import UserHistory  from './users/UserHistory';
import SettingsContainer  from './settings/SettingsContainer';
import { connect } from 'react-redux';

import Splash from './home/Splash';

import '../scss/reset.scss';
import '../scss/App.scss';
import {closeHamburger} from "../actions/HamburgerActions";

const  Layout = () => {
  return <Outlet />;
}

const App = ({ loggedIn, hamburger, closeHamburger }) => (
    <div className={`App ${hamburger ? "slide-out" : ""}`}>

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                !loggedIn
                  ? <AuthRoute element={<Splash />} />
                  : <ProtectedRoute element={<UserShow />} />
              }
            />
            <Route
              path="login"
              element={<AuthRoute element={<LoginContainer />} />}
            />
            <Route
              path="signup"
              element={<AuthRoute element={<SignupContainer />} />}
            />
            <Route
              path="settings"
              element={<ProtectedRoute element={<SettingsContainer />} />}
            />
            <Route
              path="users/:username/history"
              element={<ProtectedRoute element={<UserHistory />} />}
            />
          </Route>
        </Routes>

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
