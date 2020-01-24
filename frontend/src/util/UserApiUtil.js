import axios from 'axios';

export const fetchUserInfo = (username) => (
    axios.get(`/api/users/${username}`)
)

export const updateUserInfo = (formData,username) => (
    axios.post(`/api/users/${username}/update`, formData)
)