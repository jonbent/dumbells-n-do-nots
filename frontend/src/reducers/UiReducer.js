import { combineReducers } from "redux";
import filterReducer from './FiltersReducer'
import modalReducer from './ModalReducer'
import newRoutineData from './newRoutineDataReducer'

export default combineReducers({
    filters: filterReducer,
    modal: modalReducer,
    newRoutineData
});
