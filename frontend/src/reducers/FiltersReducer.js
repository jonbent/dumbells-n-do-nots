import { RECEIVE_SESSION_ERRORS } from '../actions/SessionActions';
import { RECEIVE_NEXT_STEP } from '../actions/FilterActions'
const _nullState = {
    currentStep: 1
}
export default function(state = _nullState, action) {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            if (
              action.errors.email ||
              action.errors.username ||
              action.errors.password ||
              action.errors.pssword2
            ) {
                return Object.assign({}, state, { currentStep: 1})
            } else {
                return Object.assign({}, state, { currentStep: 2 })
            }
        case RECEIVE_NEXT_STEP:
            return Object.assign({}, state,{currentStep: action.num})
        default:
            return state;
    }
}

