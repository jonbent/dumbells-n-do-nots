import { RECEIVE_USER_MEALS, RECEIVE_NEW_MEAL, RECEIVE_ALL_MEALS } from '../actions/MealsActions';

const MealsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_ALL_MEALS:
            newState = action.meals;
            return newState;
        case RECEIVE_USER_MEALS:
            Object.assign(newState, { [action.meals.id]: action.meals })
            return newState;
        case RECEIVE_NEW_MEAL:
            Object.assign(newState, { [action.meal.id]: action.meal })
            return newState;
        default:
            return state;
    }
};

export default MealsReducer;