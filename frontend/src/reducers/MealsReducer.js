import { RECEIVE_USER_MEALS, RECEIVE_NEW_MEAL, RECEIVE_ALL_MEALS } from '../actions/MealActions';
import { RECEIVE_API_FILTERED_MEALS} from '../actions/UserMealActions'
 
const MealsReducer = (state = [], action) => {
    let newState = [];
    switch (action.type) {
        case RECEIVE_ALL_MEALS:
            newState = action.meals.data;
            return newState;
        case RECEIVE_USER_MEALS:
            Object.assign(newState, { [action.meals.id]: action.meals })
            return newState;
        case RECEIVE_NEW_MEAL:
            Object.assign(newState, { [action.meal.id]: action.meal })
            return newState;
        case RECEIVE_API_FILTERED_MEALS:
            newState = action.meals;
            return newState;
        default:
            return state;
    }
};

export default MealsReducer;