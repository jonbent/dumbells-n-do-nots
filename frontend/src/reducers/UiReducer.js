import { combineReducers } from "redux";
import filterReducer from './FiltersReducer'
import modalReducer from './ModalReducer'

import newRoutineData from './NewRoutineDataReducer';
import routineFilterReducer from './RoutineFiltersReducer';

export default combineReducers({
    filters: filterReducer,
    modal: modalReducer,
    newRoutineData,
    routineFilters: routineFilterReducer
});
