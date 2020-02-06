import { RECEIVE_DAY_SELECTED, RECEIVE_NUM_MEALS } from '../actions/RoutineFilterActions'
import { RECEIVE_NEW_ROUTINE_STARTDATE } from '../actions/NewRoutineActions';
import {CLOSE_MODAL} from "../actions/ModalActions";

export default function (state = {}, action) {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_DAY_SELECTED:
            return Object.assign({}, state, { daySelected: action.day });
        case RECEIVE_NUM_MEALS:
            return Object.assign({}, state, { numMeals: action.num });
        case RECEIVE_NEW_ROUTINE_STARTDATE:
            return Object.assign({}, state, { daySelected: action.payload });
        case CLOSE_MODAL:
            return {};
        default:
            return state;
    }
}
