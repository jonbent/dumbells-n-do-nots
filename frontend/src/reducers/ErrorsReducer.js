import { combineReducers } from 'redux';

import SessionErrorsReducer from './SessionErrorsReducer';
import RoutineErrorsReducer from './RoutineErrorsReducer';
import MealErrorsReducer from './MealErrorsReducer';

export default combineReducers({
    session: SessionErrorsReducer,
    routine: RoutineErrorsReducer,
    meal: MealErrorsReducer
});