import {combineReducers} from 'redux';
import UsersReducer from './UsersReducer'
import sampleRoutines from './SampleRoutinesReducer';
import routines from './RoutinesReducer';

export default combineReducers({
    users: UsersReducer,
    sampleRoutines,
    routines
})