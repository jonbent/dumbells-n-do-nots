// src/util/route_util.js

import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';

// Passed in from parent component or from mapStateToProps
export const AuthRoute = ({ element }) => {
  const loggedIn = useSelector(state => state.session.isAuthenticated);
  return !loggedIn ? element : <Navigate to="/" />;
};

export const ProtectedRoute = ({ element }) => {
  const loggedIn = useSelector(state => state.session.isAuthenticated);
  return loggedIn ? element : <Navigate to="/login" />;
};

// Use the isAuthenitcated slice of state to determine whether a user is logged in
