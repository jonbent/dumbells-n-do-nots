
import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/RouteUtil';
import { Switch } from 'react-router-dom';
import SignupContainer from '../components/signup/signup_container'

import Splash from './home/Splash';

import '../scss/App.scss'

const App = () => (
  <Switch>
    <AuthRoute exact path="/" component={Splash} />
    <AuthRoute exact path="/signup" component={SignupContainer} />

  </Switch>
);

export default App;