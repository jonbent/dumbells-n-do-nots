import { combineReducers } from "redux";
import filterReducer from './FiltersReducer'
import modalReducer from './ModalReducer'
import NewRoutineData from './NewRoutineDataReducer';

export default combineReducers({
    filters: filterReducer,
    modal: modalReducer,
    NewRoutineData,
    numMeals: ""
});
