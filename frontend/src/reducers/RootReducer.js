import { combineReducers } from 'redux';
import session from './SessionReducer';
import errors from './ErrorsReducer';
import ui from './UiReducer'
import entities from './EntitiesReducer'

export default combineReducers({
    entities,
    session,
    errors,
    ui
})