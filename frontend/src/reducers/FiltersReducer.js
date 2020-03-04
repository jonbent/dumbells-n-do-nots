import { RECEIVE_SESSION_ERRORS } from '../actions/SessionActions';
import { RECEIVE_NEXT_STEP, RECEIVE_PAGE_SIZE, RECEIVE_PAGE_NUM, UPDATE_FILTER } from '../actions/FilterActions'
import {RECEIVE_ALL_MEALS} from "../actions/MealActions";

export default function(state = {}, action) {
    
    Object.freeze(state);

    switch (action.type) {
        // case "persist/REHYDRATE":
        //     return action.payload && action.payload.ui && action.payload.ui.filters ? (
        //         Object.assign({}, _nullState, state, action.payload.ui.filters)
        //     ) : (
        //         state
        //     );
        case UPDATE_FILTER:
            if (isNaN(action.payload.value)) return state;
            if (action.payload.value === "") return Object.assign({}, state, {[action.payload.filterName]: ""});
            return Object.assign({}, state, {[action.payload.filterName]: parseInt(action.payload.value)})
        case RECEIVE_ALL_MEALS:
            return Object.assign({}, state,{numMeals: action.payload.totalMeals})
        case RECEIVE_SESSION_ERRORS:
            return (
              action.errors.email ||
              action.errors.username ||
              action.errors.password ||
              action.errors.pssword2
            ) ? (
                Object.assign({}, state, { currentStep: 1})
            ) : (
                Object.assign({}, state, { currentStep: 2 })
            );
        case RECEIVE_NEXT_STEP:
            return Object.assign({}, state,{currentStep: action.num});
        case RECEIVE_PAGE_SIZE:
            return Object.assign({}, state,{pageSize: action.num});
        case RECEIVE_PAGE_NUM:
            return Object.assign({}, state,{pageNum: action.num});
        default:
            return state;
    }
}

