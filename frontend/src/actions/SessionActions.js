import * as SessionApiUtil from '../util/SessionApiUtil';
import {jwtDecode} from 'jwt-decode';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
export const RESET_ERRORS = "RECEIVE_USER_SIGN_IN";

export const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});

export const receiveUserSignIn = () => ({
    type: RECEIVE_USER_SIGN_IN
});

export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});
export const resetErrors = () => ({
    type: RESET_ERRORS,
});

export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

export const signup = user => dispatch => (
    SessionApiUtil.signup(user).then((res) => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        SessionApiUtil.setAuthToken(token);
        const decoded = jwtDecode(token);
        return dispatch(receiveCurrentUser(decoded))
    }, err => (
        dispatch(receiveErrors(err.response.data))
    ))
);

export const login = user => dispatch => (
    SessionApiUtil.login(user).then(res => {

        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        SessionApiUtil.setAuthToken(token);
        const decoded = jwtDecode(token);
        dispatch(receiveCurrentUser(decoded))
    })
        .catch(err => {
            dispatch(receiveErrors(err.response.data));
        })
)

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken')
    SessionApiUtil.setAuthToken(false)
    return dispatch(logoutUser())
};
