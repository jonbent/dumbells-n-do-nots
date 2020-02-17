import {combineReducers} from 'redux';
import UsersReducer from './UsersReducer';
import sampleRoutines from './SampleRoutinesReducer';
import routines from './RoutinesReducer';
import meals from './MealsReducer';
import days from './DaysReducer';
import workouts from './WorkoutsReducer';
import routineMeals from './RoutineMealsReducer';
import MuscleGroupReducer from './MuscleGroupsReducer';
import ExersicesReducer from './ExercisesReducer';
import userMeals from './UserMealsReducer';

export default combineReducers({
    users: UsersReducer,
    sampleRoutines,
    routines,
    routineMeals,
    meals,
    workouts,
    days,
    userMeals,
    muscleGroups: MuscleGroupReducer,
    exercises: ExersicesReducer,
})