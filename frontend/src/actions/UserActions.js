import * as UserApiUtil from '../util/UserApiUtil'
import * as SessionApiUtil from "../util/SessionApiUtil";
import jwt_decode from "jwt-decode";

import {receiveCurrentUser, receiveErrors} from './SessionActions';

export const RECEIVE_USER = 'RECEIVE_USER';

const receiveUser = (payload) => ({
    type: RECEIVE_USER,
    payload
})

export const fetchUser = (username) => dispatch => (
    UserApiUtil.fetchUserInfo(username).then(payload => dispatch(receiveUser(payload)))
)

export const updateUser = (formData, username) => dispatch =>
         UserApiUtil.updateUserInfo(formData, username)
           .then(res => {
             const { token } = res.data;
             localStorage.setItem("jwtToken", token);
             SessionApiUtil.setAuthToken(token);
             const decoded = jwt_decode(token);
             dispatch(receiveCurrentUser(decoded));            
           })
           .catch(err => {
             dispatch(receiveErrors(err.response.data));
           });