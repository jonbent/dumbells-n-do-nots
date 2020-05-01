import * as UserMealsApiUtil from '../util/UserMealsApiUtil';

export const RECEIVE_NEW_DAY_MEAL = "RECEIVE_NEW_DAY_MEAL";
export const RECEIVE_DAY_MEALS = "RECEIVE_DAY_MEALS";
export const RECEIVE_API_FILTERED_MEALS = "RECEIVE_API_FILTERED_MEALS"


export const receiveDayUserMeal = meal => ({
    type: RECEIVE_NEW_DAY_MEAL,
    meal
})

export const receiveNewUserMeals = meal => ({
    type: RECEIVE_DAY_MEALS,
    meal
})

export const receiveApiFilteredMeals = meals => ({
    type: RECEIVE_API_FILTERED_MEALS,
    meals
})

export const fetchDayUserMeals = id => dispatch => (
    UserMealsApiUtil.getDayUserMeals(id)
        .then(meal => dispatch(receiveDayUserMeal(meal)))
        
);

export const fetchApiFilteredMeals = (minCals, maxCals) => dispatch => (
    UserMealsApiUtil.fetchCaloriesFilteredApiMeals(minCals, maxCals)
        .then(meals => dispatch(receiveApiFilteredMeals(meals)))
        
);