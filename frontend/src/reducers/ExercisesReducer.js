import { RECEIVE_EXERCISES_BY_MUSCLE_GROUPS, RECEIVE_ALL_EXERCISES } from '../actions/ExerciseActions';
import {RECEIVE_USER_ROUTINE} from "../actions/RoutineActions";
const ExercisesReducer = (state={}, action) =>{
    Object.freeze(state);
    // let newState = Object.assign({}, state);
    let newState = {};
    switch (action.type) {
        case RECEIVE_EXERCISES_BY_MUSCLE_GROUPS:
            action.exercises.data.forEach(exercise => newState[exercise._id] = exercise);
            return Object.assign({}, state, newState);
        case RECEIVE_ALL_EXERCISES:
            newState = action.exercises.data;
            return newState;
        case RECEIVE_USER_ROUTINE:
            action.payload.exercises.forEach(exercise => newState[exercise._id] = exercise);
            return Object.assign({}, state, newState);
        // case RECEIVE_USER_EXERCISES:
        //     Object.assign(newState, { [action.exercises.id]: action.exercises })
        //     return newState;
        // case RECEIVE_NEW_EXERCISE:
        //     Object.assign(newState, { [action.exercises.id]: action.exercises })
        //     return newState;
        default:
            return state;
    }
};

export default ExercisesReducer;