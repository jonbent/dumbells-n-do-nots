import axios from 'axios';

export const getSampleRoutines = () => {
    return axios.get('/api/routines/sample')
};

export const getUserRoutine = id => {
    return axios.get(`/api/routines/user/${id}/single`)
};

export const getUserRoutines = id => {
    return axios.get(`/api/routines/user/${id}`)
};

export const createRoutine = data => {
    return axios.post('/api/routines/', data)
}

export const updateRoutine = data => {
    return axios.put(`/api/routines/${data.id}`, data)
}

export const getRoutineById = id => {
    return axios.get(`/api/routines/${id}`)
}

export const fetchRoutineByStartDate = (startDate) => {
    return axios.get('/api/routines/startDate', {params: {startDate}})
}