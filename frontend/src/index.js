import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './components/Root';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import configureStore from './store/store'
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/SessionApiUtil'

import { logout, login } from './actions/SessionActions';


document.addEventListener('DOMContentLoaded', () => {
    window.axios = axios;
    let store;
    let preloadedState = {ui:{
        filters: {
            currentStep: 1
        }
    }};
    if (localStorage.jwtToken) {

        // Set the token as a common header for all axios requests
        setAuthToken(localStorage.jwtToken);

        // Decode the token to obtain the user's information
        const decodedUser = jwt_decode(localStorage.jwtToken);

        // Create a preconfigured state we can immediately add to our store
        preloadedState = { session: { isAuthenticated: true, user: decodedUser }, entities: { users: { [decodedUser.username]: decodedUser}} };

        store = configureStore(preloadedState);

        const currentTime = Date.now() / 1000;

        // If the user's token has expired
        if (decodedUser.exp < currentTime) {
            // Logout the user and redirect to the login page
            store.dispatch(logout());
            window.location.href = '/#/login';
        }
    } else {
        // If this is a first time user, start with an empty store
        store = configureStore(preloadedState);
    }
    window.store = store
    window.login = login
    window.logout = logout
    ReactDOM.render(<Root store={store}/>, document.getElementById('root'));
})



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
