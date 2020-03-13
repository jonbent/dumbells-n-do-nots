import axios from 'axios';

export const fetchUserInfo = (username) => (
    axios.get(`/api/users/${username}`)
)

export const updateUserInfo = (formData,username) => {
    return(
    axios({method:"patch", url: `/api/users/${username}/update`, data: formData, headers: {'Content-Type': 'multipart/form-data' }})
    );
}