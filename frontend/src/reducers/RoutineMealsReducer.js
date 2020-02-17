import {RECEIVE_USER_ROUTINE} from '../actions/RoutineActions';

export default (prevState = {}, action) => {
    let nextState = {};
    switch (action.type) {
        case RECEIVE_USER_ROUTINE:
            action.payload.meals.forEach(meal => nextState[meal._id] = meal);
            return Object.assign({}, prevState, nextState);
        default:
            return prevState;
    }
}