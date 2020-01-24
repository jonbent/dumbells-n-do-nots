import { combineReducers } from "redux";
import filterReducer from './FiltersReducer'
import modalReducer from './ModalReducer'

export default combineReducers({
    filters: filterReducer,
    modal: modalReducer,
    newRoutineData
});
