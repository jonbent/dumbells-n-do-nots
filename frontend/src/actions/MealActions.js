import * as MealsApiUtil from '../util/MealsApiUtil';

export const RECEIVE_MEAL_ERRORS = "RECEIVE_MEAL_ERRORS"
export const RECEIVE_ALL_MEALS = "RECEIVE_ALL_MEALS"
export const RECEIVE_USER_MEALS = "RECEIVE_USER_MEALS";
export const RECEIVE_NEW_MEAL = "RECEIVE_NEW_MEAL";
export const RECEIVE_SELECTED_MEALS = "RECEIVE_SELECTED_MEALS";
export const RECEIVE_MEAL_DETAILS = "RECEIVE_MEAL_DETAILS";

export const receiveMealErrors = errors => ({
    type: RECEIVE_MEAL_ERRORS,
    errors
});

export const receiveAllMeals = payload => ({
    type: RECEIVE_ALL_MEALS,
    payload
});

export const receiveUserMeals = meals => ({
    type: RECEIVE_USER_MEALS,
    meals
});

export const receiveNewMeals = meal => ({
    type: RECEIVE_NEW_MEAL,
    meal
});
export const receiveNewMeal = meal => ({
    type: RECEIVE_NEW_MEAL,
    meal
});

export const receiveSelectedMeals = meals => ({
    type: RECEIVE_SELECTED_MEALS,
    meals
});

export const receiveMealDetails = payload => ({
    type: RECEIVE_MEAL_DETAILS,
    payload
})

export const fetchSelectedMeals = selectedMealIds => dispatch => (
    MealsApiUtil.fetchSelectedMeals(selectedMealIds)
        .then(res => dispatch(receiveSelectedMeals(res.data)))

);

export const fetchAllMeals = () => dispatch => (
    MealsApiUtil.getAllMeals()
     .then(meals => dispatch(receiveAllMeals(meals)))

);

export const fetchMeals = (options) => dispatch => (
    MealsApiUtil.getMeals(options)
        .then(res => dispatch(receiveAllMeals(res.data)))

);

export const fetchMealDetails = (options) => dispatch => (
    MealsApiUtil.fetchMealDetails(options)
        .then(res => dispatch(receiveMealDetails(res.data)))
        .catch(err => console.log(err))
)

export const fetchUserMeals = id => dispatch => (
    MealsApiUtil.getUserMeals(id)
        .then(meal => dispatch(receiveUserMeals(meal)))

);

export const createMeals = data => dispatch => (
    MealsApiUtil.createMeals(data)
        .then(meal => dispatch(receiveNewMeals(meal)))

);
export const createMeal = data => dispatch => (
    MealsApiUtil.createMeal(data)
        .then(meal => dispatch(receiveNewMeal(meal.data.newMeal)))
        .catch(err => {
            dispatch(receiveMealErrors(err.response.data));
            throw "Meal failed to create with given info";
        })
);
