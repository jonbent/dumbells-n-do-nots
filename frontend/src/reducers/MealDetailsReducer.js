import {RECEIVE_MEAL_DETAILS} from "../actions/MealActions";

const MealDetailsReducer = (state = {}, action) => {
    switch (action.type){
        case RECEIVE_MEAL_DETAILS:
            console.log(action);
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }

}

export default MealDetailsReducer;
