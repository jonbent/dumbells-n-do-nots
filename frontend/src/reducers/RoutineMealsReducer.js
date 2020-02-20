import {RECEIVE_USER_ROUTINE} from '../actions/RoutineActions';
import { RECEIVE_ALL_MEALS } from '../actions/MealActions';

export default (prevState = {}, action) => {
    let nextState = {};
    switch (action.type) {
        case RECEIVE_USER_ROUTINE:
            nextState = Object.assign({}, prevState);
            action.payload.meals.forEach(meal => nextState[meal._id] = meal);
            return Object.assign({}, prevState, nextState);
        case RECEIVE_ALL_MEALS:
            nextState = Object.assign({}, prevState);
            action.payload.meals.forEach(meal => nextState[meal._id] = meal);
            return Object.assign({}, prevState, nextState);
        default:
            return prevState;
    }
}