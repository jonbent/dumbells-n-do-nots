import {RECEIVE_USER_ROUTINE} from "../actions/RoutineActions";

export default (prevState = {}, action) => {
    let nextState = {};
    switch(action.type){
        case RECEIVE_USER_ROUTINE:
            action.payload.days.forEach(day => nextState[day._id] = day);
            return nextState;
        default:
            return prevState;
    }
}