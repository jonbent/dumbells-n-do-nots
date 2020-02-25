import { combineReducers } from "redux";
import filtersModal from './FiltersModalReducer';
import filterReducer from './FiltersReducer';
import modalReducer from './ModalReducer';

import newRoutineData from './NewRoutineDataReducer';
import routineFilterReducer from './RoutineFiltersReducer';

export default combineReducers({
    filters: filterReducer,
    modal: modalReducer,
    filtersModal,
    newRoutineData,
    routineFilters: routineFilterReducer
});
