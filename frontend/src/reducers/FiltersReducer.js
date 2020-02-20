import { RECEIVE_SESSION_ERRORS } from '../actions/SessionActions';
import { RECEIVE_NEXT_STEP, RECEIVE_PAGE_SIZE, RECEIVE_PAGE_NUM } from '../actions/FilterActions'
import { OPEN_MODAL } from '../actions/ModalActions';
import {RECEIVE_ALL_MEALS} from "../actions/MealActions";
const _nullState = {
    currentStep: 1,
    pageSize: 10,
    pageNum: 1
}
export default function(state = _nullState, action) {
    
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_ALL_MEALS:
            return Object.assign({}, state,{numMeals: action.payload.totalMeals})
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
        case RECEIVE_PAGE_SIZE:
            return Object.assign({}, state,{pageSize: action.num})
        case RECEIVE_PAGE_NUM:
            return Object.assign({}, state,{pageNum: action.num})
        case OPEN_MODAL:
            if(action.modal === "addUserMeals") return _nullState;
            return state;
        default:
            return state;
    }
}

