import { combineReducers } from "redux";
import filterModal from './FilterModalReducer';
import filterReducer from './FiltersReducer';
import modalReducer from './ModalReducer';

import newRoutineData from './NewRoutineDataReducer';
import routineFilterReducer from './RoutineFiltersReducer';

export default combineReducers({
    filters: filterReducer,
    modal: modalReducer,
    filterModal,
    newRoutineData,
    routineFilters: routineFilterReducer
});
