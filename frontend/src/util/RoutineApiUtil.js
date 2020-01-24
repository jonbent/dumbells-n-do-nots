import axios from 'axios';

export const getSampleRoutines = () => {
    return axios.get('/api/routines/sample')
};

export const getUserRoutine = id => {
    return axios.get(`/api/routines/user/${id}`)
};

export const createRoutine = data => {
    return axios.post('/api/routines/new', data)
}