import axios from 'axios';

export const fetchUserInfo = (username) => (
    axios.get(`/api/users/${username}`)
)

export const updateUserInfo = formData => (
    axios.post(`/api/users/${formData.username}/update`, formData)
)