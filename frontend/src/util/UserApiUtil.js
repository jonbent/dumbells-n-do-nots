import axios from 'axios';

export const fetchUserInfo = (username) => (
    axios.get(`/api/users/${username}`)
)