import axios from 'axios';

export const getAllMeals = () => {
    return axios.get('/api/meals')
};
export const getMeals = (options) => {
    return axios.get('/api/meals', {params: options})
};

export const getUserMeals = id => {
    return axios.get(`/api/meals/user/${id}`)
};

export const createMeals = data => {
    return axios.post('/api/meals/', data)
}
export const createMeal = data => {
    return axios.post('/api/meals/', data)
}

export const fetchSelectedMeals = (selectedMealIds) => (
    axios.get('/api/meals/selected', {params: {selectedMealIds}})
)

export const fetchMealDetails = (spoonacularId) => {
    return axios.get(`/api/meals/${spoonacularId}`);
}
