import {combineReducers} from 'redux';
import UsersReducer from './UsersReducer'
import sampleRoutines from './SampleRoutinesReducer';
import routines from './RoutinesReducer';
import meals from './MealsReducer'

export default combineReducers({
    users: UsersReducer,
    sampleRoutines,
    routines,
    meals
})