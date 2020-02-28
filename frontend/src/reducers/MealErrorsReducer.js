import {RECEIVE_MEAL_ERRORS, RECEIVE_NEW_MEAL} from "../actions/MealActions";
import {CLOSE_MODAL} from "../actions/ModalActions";
import {RECEIVE_NEW_ROUTINE_STARTDATE} from "../actions/NewRoutineActions";

export default (prevState = {}, action) => {
    Object.freeze(prevState);
    switch(action.type){
        case RECEIVE_MEAL_ERRORS:
            return action.errors;
        case CLOSE_MODAL:
            return {};
        case RECEIVE_NEW_MEAL:
            return {};
        case RECEIVE_NEW_ROUTINE_STARTDATE:
            return {};
        default:
            return prevState;
    }
}