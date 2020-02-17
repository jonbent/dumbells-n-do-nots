import {RECEIVE_USER_ROUTINE} from "../actions/RoutineActions";

export default (prevState = {}, action) => {
    Object.freeze(prevState);
    switch(action.type){
        case RECEIVE_USER_ROUTINE:
            return Object.assign({}, prevState, action.payload.workouts);
        default:
            return prevState;
    }
}