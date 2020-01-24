import {combineReducers} from 'redux';
import UsersReducer from './UsersReducer'
import sampleRoutines from './SampleRoutinesReducer';
import routines from './RoutinesReducer';
import meals from './MealsReducer'
import MuscleGroupReducer from './MuscleGroupsReducer'

export default combineReducers({
    users: UsersReducer,
    sampleRoutines,
    routines,
    meals,
    muscleGroups: MuscleGroupReducer

})