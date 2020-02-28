import {RECEIVE_ALERT, CLEAR_ALERT} from "../actions/AlertActions";
const _nullState = {
    message: "blank message",
    status: "none"
}
export default (prevState = _nullState, action) => {
    Object.freeze(prevState);
    switch (action.type) {
        case RECEIVE_ALERT:
            return action.payload;
        case CLEAR_ALERT:
            return _nullState;
        default:
            return prevState;
    }
}