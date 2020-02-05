import * as MealsApiUtil from '../util/MealsApiUtil';

export const RECEIVE_ALL_MEALS = "RECEIVE_ALL_MEALS"
export const RECEIVE_USER_MEALS = "RECEIVE_USER_MEALS";
export const RECEIVE_NEW_MEAL = "RECEIVE_NEW_MEAL";

export const receiveAllMeals = meals => ({
    type: RECEIVE_ALL_MEALS,
    meals
})

export const receiveUserMeals = meals => ({
    type: RECEIVE_USER_MEALS,
    meals
});

export const receiveNewMeals = meal => ({
    type: RECEIVE_NEW_MEAL,
    meal
})

export const fetchAllMeals = () => dispatch => (
    MealsApiUtil.getAllMeals()
     .then(meals => dispatch(receiveAllMeals(meals)))
     .catch(err => console.log(err))
)

export const fetchMeals = (options) => dispatch => (
    MealsApiUtil.getMeals(options)
        .then(meals => dispatch(receiveAllMeals(meals)))
        .catch(err => console.log(err))
)

export const fetchUserMeals = id => dispatch => (
    MealsApiUtil.getUserMeals(id)
        .then(meal => dispatch(receiveUserMeals(meal)))
        .catch(err => console.log(err))
);

export const createMeals = data => dispatch => (
    MealsApiUtil.createMeals(data)
        .then(meal => dispatch(receiveNewMeals(meal)))
        .catch(err => console.log(err))
);