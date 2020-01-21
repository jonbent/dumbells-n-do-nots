import { combineReducers } from "redux";
import filterReducer from './FiltersReducer'

export default combineReducers({
    filters: filterReducer
});
