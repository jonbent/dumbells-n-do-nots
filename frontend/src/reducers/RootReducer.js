import { combineReducers } from 'redux';
import session from './SessionReducer';
import errors from './ErrorsReducer';

export default combineReducers({
    session,
    errors
})