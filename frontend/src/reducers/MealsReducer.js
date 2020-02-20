import { RECEIVE_USER_MEALS, RECEIVE_NEW_MEAL, RECEIVE_ALL_MEALS } from '../actions/MealActions';
import { RECEIVE_API_FILTERED_MEALS} from '../actions/UserMealActions'
import {RECEIVE_USER_ROUTINE} from "../actions/RoutineActions";

const MealsReducer = (state = {}, action) => {
    let newState = {};
    switch (action.type) {
        case RECEIVE_ALL_MEALS:
            // newState = Object.assign({}, state)
            action.meals.data.forEach(el => newState[el._id] = el);
            return newState;
        case RECEIVE_USER_MEALS:
            newState = Object.assign(newState, { [action.meals.id]: action.meals })
            return newState;
        case RECEIVE_NEW_MEAL:
            newState = Object.assign(newState, { [action.meal.id]: action.meal })
            return newState;
        case RECEIVE_API_FILTERED_MEALS:
            newState = action.meals;
            return newState;
        case RECEIVE_USER_ROUTINE:
            newState = Object.assign(newState, state)
            action.payload.meals.forEach(el => newState[el._id] = el);
            return newState;
        default:
            return state;
    }
};

export default MealsReducer;