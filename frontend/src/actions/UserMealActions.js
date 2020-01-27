import * as UserMealsApiUtil from '../util/UserMealsApiUtil';

export const RECEIVE_NEW_DAY_MEAL = "RECEIVE_NEW_DAY_MEAL";
export const RECEIVE_DAY_MEALS = "RECEIVE_DAY_MEALS";

export const receiveDayUserMeal = meal => ({
    type: RECEIVE_NEW_DAY_MEAL,
    meal
})

export const receiveNewUserMeals = meal => ({
    type: RECEIVE_DAY_MEALS,
    meal
})

export const fetchDayUserMeals = id => dispatch => (
    UserMealsApiUtil.getDayUserMeals(id)
        .then(meal => dispatch(receiveDayUserMeal(meal)))
        .catch(err => console.log(err))
);

export const createDayUserMeal = data => dispatch => (
    UserMealsApiUtil.createUserMealForDay(data)
        .then(meal => dispatch(receiveNewUserMeals(meal)))
        .catch(err => console.log(err))
);