import {RECEIVE_USER_ROUTINE, RECEIVE_USER_ROUTINES} from "../actions/RoutineActions";
import {RECEIVE_USER_LOGOUT, RECEIVE_USER_SIGN_IN} from "../actions/SessionActions";

export default (prevState = {}, action) => {
    let nextState = {};
    switch(action.type){
        case RECEIVE_USER_SIGN_IN:
            return nextState;
        case RECEIVE_USER_LOGOUT:
            return nextState;
        case RECEIVE_USER_ROUTINE:
            nextState = Object.assign({}, prevState);
            action.payload.days.forEach(day => nextState[day._id] = day);
            return nextState;
        case RECEIVE_USER_ROUTINES:
            nextState = Object.assign({}, prevState)
            action.payload.days.forEach(day => nextState[day._id] = day);
            return nextState;
        default:
            return prevState;
    }
}