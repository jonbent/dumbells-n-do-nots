
import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/RouteUtil';
import { Switch, Route } from 'react-router-dom';
import SignupContainer from './signup/signup_container';
import LoginContainer  from './login/LoginContainer';
import UserShowContainer  from './users/UserShowContainer';
import UserHistory  from './users/UserHistoryContainer';
import SettingsContainer  from './settings/SettingsContainer';
import { connect } from 'react-redux';

import Splash from './home/Splash';

import '../scss/reset.scss';
import '../scss/App.scss';

const App = ({ loggedIn }) => (
    <div>
        <Switch>
            <AuthRoute exact path="/signup" component={SignupContainer} />
            <AuthRoute exact path="/login" component={LoginContainer} />
            {!loggedIn && <AuthRoute exact path="/" component={Splash} />}
            <ProtectedRoute exact path="/settings" component={SettingsContainer} />}
            <Route path="/users/:username/history" component={UserHistory}/>
            {loggedIn &&  <ProtectedRoute path="/" component={UserShowContainer} />}
        </Switch>

    </div>
);

const mapStateToProps = state => (
  { loggedIn: state.session.isAuthenticated }
);
export default connect(mapStateToProps)(App);