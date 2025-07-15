import * as UserApiUtil from '../util/UserApiUtil'
import * as SessionApiUtil from "../util/SessionApiUtil";
import {jwtDecode} from "jwt-decode";

import {receiveCurrentUser, receiveErrors} from './SessionActions';

export const RECEIVE_USER = 'RECEIVE_USER';

const receiveUser = (payload) => ({
    type: RECEIVE_USER,
    payload
})

export const fetchUser = (username) => dispatch => (
    UserApiUtil.fetchUserInfo(username).then(res => dispatch(receiveUser(res.data)))
)

export const updateUser = (formData, username) => dispatch =>
         UserApiUtil.updateUserInfo(formData, username)
           .then(res => {
             const { token } = res.data;
             localStorage.setItem("jwtToken", token);
             SessionApiUtil.setAuthToken(token);
             const decoded = jwtDecode(token);
             dispatch(receiveCurrentUser(decoded));
           })
           .catch(err => {
             return dispatch(receiveErrors(err));
           });
