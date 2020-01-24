
import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/RouteUtil';
import { Switch } from 'react-router-dom';
import SignupContainer from './signup/signup_container';
import MuscleGroupsSelectorContainer from './musclegroups/MuscleGroupSelectorContainer';
import LoginContainer  from './login/LoginContainer';
import UserShowContainer  from './users/UserShowContainer';
import { connect } from 'react-redux';

import Splash from './home/Splash';

import '../scss/reset.scss';
import '../scss/App.scss';

const App = ({ loggedIn }) => (
  <Switch>
    {!loggedIn ? (
      <AuthRoute exact path="/" component={Splash} />
    ) : (
      <ProtectedRoute component={UserShowContainer} />
    )}
    <AuthRoute exact path="/" component={Splash} />
    <AuthRoute exact path="/signup" component={SignupContainer} />
    <AuthRoute exact path="/login" component={LoginContainer} />
    <ProtectedRoute
      exact
      path="/routine/:routineId/new"
      component={MuscleGroupsSelectorContainer}
    />
  </Switch>
);

const mapStateToProps = state => (
  { loggedIn: state.session.isAuthenticated }
);
export default connect(mapStateToProps)(App);