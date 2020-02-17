// import {
//     RECEIVE_DAY_MEALS,
//     RECEIVE_NEW_DAY_MEAL
// } from '../actions/UserMealActions';
import {RECEIVE_USER_ROUTINE} from "../actions/RoutineActions";

export default (prevState = {}, action) => {
    Object.freeze(prevState);
    switch (action.type) {
        case RECEIVE_USER_ROUTINE:
            return Object.assign({}, prevState, action.payload.userMeals);
        default:
            return prevState;
    }
}