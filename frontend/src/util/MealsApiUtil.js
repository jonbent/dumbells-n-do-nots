import axios from 'axios';

export const getAllMeals = () => {
    return axios.get('/api/meals')
};

export const getUserRoutine = id => {
    return axios.get(`/api/meals/user/${id}`)
};

export const createRoutine = data => {
    return axios.post('/api/meals/', data)
}