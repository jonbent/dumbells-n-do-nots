import * as UserApiUtil from '../util/UserApiUtil'

export const RECEIVE_USER = 'RECEIVE_USER';

const receiveUser = (payload) => ({
    type: RECEIVE_USER,
    payload
})

export const fetchUser = (username) => dispatch => (
    UserApiUtil.fetchUserInfo(username).then(payload => dispatch(receiveUser(payload)))
)

export const updateUser = (formData,username) => dispatch =>
    UserApiUtil.updateUserInfo(formData, username)
    .then(payload => dispatch(receiveUser(payload)))