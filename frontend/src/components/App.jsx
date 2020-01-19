import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/RouteUtil';
import { Switch } from 'react-router-dom';

import Splash from './home/Splash';

const App = () => (
  <Switch>
    <AuthRoute exact path="/" component={Splash} />
  </Switch>
);

export default App;