import { RECEIVE_USER_ROUTINE, RECEIVE_NEW_ROUTINE } from '../actions/RoutineActions';

const RoutinesReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_USER_ROUTINE:
            Object.assign(newState, {[action.routine.id] : action.routine})
            return newState;
        case RECEIVE_NEW_ROUTINE:
            Object.assign(newState, { [action.routine.id]: action.routine })
            return newState;
        default:
            return state;
    }
};

export default RoutinesReducer;