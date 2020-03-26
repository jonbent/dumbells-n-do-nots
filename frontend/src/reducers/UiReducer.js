import { combineReducers } from "redux";
import filtersModal from './FiltersModalReducer';
import filterReducer from './FiltersReducer';
import modalReducer from './ModalReducer';
import alert from './AlertReducer';

import newRoutineData from './NewRoutineDataReducer';
import routineFilterReducer from './RoutineFiltersReducer';
import HamburgerReducer from "./HamburgerReducer";

export default combineReducers({
    filters: filterReducer,
    modal: modalReducer,
    alert,
    filtersModal,
    newRoutineData,
    routineFilters: routineFilterReducer,
    hamburger: HamburgerReducer
});
