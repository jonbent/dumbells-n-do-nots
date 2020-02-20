import {RECEIVE_ROUTINE_ERRORS, RECEIVE_NEW_ROUTINE_STARTDATE_WITH_DATA, RECEIVE_NEW_ROUTINE_STARTDATE} from "../actions/NewRoutineActions";
import {CLOSE_MODAL} from "../actions/ModalActions";

export default (prevState = {}, action) => {
    Object.freeze(prevState);
    console.log("hitting");
    switch (action.type) {
        case RECEIVE_ROUTINE_ERRORS:
            return Object.assign({}, prevState, action.errors);
        case RECEIVE_NEW_ROUTINE_STARTDATE_WITH_DATA:
            return {};
        case RECEIVE_NEW_ROUTINE_STARTDATE:
            return {};
        case CLOSE_MODAL:
            return {};
        default:
            return prevState
    }
}