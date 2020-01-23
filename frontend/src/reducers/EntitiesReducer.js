import {combineReducers} from 'redux';
import UsersReducer from './UsersReducer'
import MuscleGroupReducer from './MuscleGroupsReducer'

export default combineReducers({
    users: UsersReducer,
    muscleGroups: MuscleGroupReducer
})