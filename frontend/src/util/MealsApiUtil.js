import axios from 'axios';

export const getAllMeals = () => {
    return axios.get('/api/meals')
};

export const getUserMeals = id => {
    return axios.get(`/api/meals/user/${id}`)
};

export const createMeals = data => {
    return axios.post('/api/meals/', data)
}