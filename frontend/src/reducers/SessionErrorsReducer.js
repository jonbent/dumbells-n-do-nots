import {
    RECEIVE_SESSION_ERRORS,
    RECEIVE_CURRENT_USER,
    RESET_ERRORS
} from '../actions/SessionActions';

const _nullErrors = [];

const SessionErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
        case RECEIVE_CURRENT_USER:
            return _nullErrors;
        case RESET_ERRORS:
            return _nullErrors;
        default:
            return state;
    }
};

export default SessionErrorsReducer;