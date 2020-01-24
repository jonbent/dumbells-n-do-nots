
import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/RouteUtil';
import { Switch } from 'react-router-dom';
import SignupContainer from './signup/signup_container';
import LoginContainer  from './login/LoginContainer';
import UserShowContainer  from './users/UserShowContainer';
// import MuscleGroupsSelectorContainer from './muscleGroups/muscle_groups_selector_container';
import { connect } from 'react-redux';

import Splash from './home/Splash';

import '../scss/reset.scss';
import '../scss/App.scss';

const App = ({loggedIn}) => (
  <Switch>
    {
      !loggedIn ? (
        <AuthRoute exact path="/" component={Splash} />
      ) : (
        <ProtectedRoute component={UserShowContainer}/>
      )
    }
    <AuthRoute exact path="/" component={Splash} />
    <AuthRoute exact path="/signup" component={SignupContainer} />
    <AuthRoute exact path="/login" component={LoginContainer} />

  </Switch>
);

const mapStateToProps = state => (
  { loggedIn: state.session.isAuthenticated }
);
export default connect(mapStateToProps)(App);