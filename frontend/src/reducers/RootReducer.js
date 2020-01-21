import { combineReducers } from 'redux';
import session from './SessionReducer';
import errors from './ErrorsReducer';
import ui from './UiReducer'

export default combineReducers({
    session,
    errors,
    ui
})