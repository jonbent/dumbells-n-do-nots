import axios from 'axios';

export const getDayUserMeals = id => {
    return axios.get(`/api/userMeals/day/:day_id/`)
};

export const createUserMealForDay = data => {
    return axios.post('/api/userMeals/day/:day_id/', data)
}

export const fetchCaloriesFilteredApiMeals = (minCals, maxCals) => {
    return axios.get(`https://api.spoonacular.com/recipes/findByNutrients?apiKey=cbaca8fc57ee4b1289c2a68550a4ef05&maxCalories=${maxCals}&minCalories=${minCals}&offset=990&number=100`)
}

const stealMeals = () => {
    for(let i = 0; i < 100; i++){
        let promise = axios.get(`https://api.spoonacular.com/recipes/findByNutrients?apiKey=f089485e5bd04936b587f8eeb210109f&maxCalories=9000&minCalories=1&offset=${i * 100}&number=100`)
        promises.push(promise)
        promise.then(res => result = result.concat(res))
    }
    Promise.all(promises).then(() => console.log(result))
}