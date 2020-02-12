import {combineReducers} from 'redux';
import UsersReducer from './UsersReducer';
import sampleRoutines from './SampleRoutinesReducer';
import routines from './RoutinesReducer';
import meals from './MealsReducer';
import days from './DaysReducer';
import routineMeals from './RoutineMealsReducer';
import MuscleGroupReducer from './MuscleGroupsReducer';
import ExersicesReducer from './ExercisesReducer';

export default combineReducers({
    users: UsersReducer,
    sampleRoutines,
    routines,
    routineMeals,
    meals,
    days,
    muscleGroups: MuscleGroupReducer,
    exercises: ExersicesReducer,
})