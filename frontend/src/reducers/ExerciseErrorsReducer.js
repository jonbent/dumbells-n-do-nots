import {RECEIVE_EXERCISE_ERRORS, RECEIVE_NEW_EXERCISE} from "../actions/ExerciseActions";
import {CLOSE_MODAL} from "../actions/ModalActions";

export default (prevState = {}, action) => {
    Object.freeze(prevState);
    switch (action.type) {
        case RECEIVE_EXERCISE_ERRORS:
            return action.errors;
        case CLOSE_MODAL:
            return {};
        case RECEIVE_NEW_EXERCISE:
            return {};
        default:
            return prevState;
    }
}