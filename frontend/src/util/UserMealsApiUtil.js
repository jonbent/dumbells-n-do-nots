import axios from 'axios';

export const getDayUserMeals = id => {
    return axios.get(`/api/userMeals/day/:day_id/`)
};

export const createUserMealForDay = data => {
    return axios.post('/api/userMeals/day/:day_id/', data)
}

export const fetchCaloriesFilteredApiMeals = (minCals, maxCals) => {
    return axios.get(`https://api.spoonacular.com/recipes/findByNutrients?apiKey=cbaca8fc57ee4b1289c2a68550a4ef05&maxCalories=${maxCals}&minCalories=${minCals}`)
}