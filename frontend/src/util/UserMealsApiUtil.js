import axios from 'axios';

export const getDayUserMeals = id => {
    return axios.get(`/api/userMeals/day/:day_id/`)
};

export const createUserMealForDay = data => {
    return axios.post('/api/userMeals/day/:day_id/', data)
}