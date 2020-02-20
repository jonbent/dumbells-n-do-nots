import { combineReducers } from 'redux';

import SessionErrorsReducer from './SessionErrorsReducer';
import RoutineErrorsReducer from './RoutineErrorsReducer';

export default combineReducers({
    session: SessionErrorsReducer,
    routine: RoutineErrorsReducer
});