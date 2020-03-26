import { RECEIVE_USER_ROUTINE, RECEIVE_NEW_ROUTINE, RECEIVE_USER_ROUTINES } from '../actions/RoutineActions';
import {RECEIVE_USER_LOGOUT, RECEIVE_USER_SIGN_IN} from "../actions/SessionActions";
const RoutinesReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_USER_SIGN_IN:
            return {};
        case RECEIVE_USER_LOGOUT:
            return {};
        case RECEIVE_USER_ROUTINE:
            newState = Object.assign(newState, {[action.payload.routine._id] : action.payload.routine})
            return newState;
        case RECEIVE_USER_ROUTINES:
            action.payload.routines.forEach(r => newState[r._id] = r);
            return newState;
        case RECEIVE_NEW_ROUTINE:
            Object.assign(newState, { [action.routine.id]: action.routine })
            return newState;
        default:
            return state;
    }
};

export default RoutinesReducer;