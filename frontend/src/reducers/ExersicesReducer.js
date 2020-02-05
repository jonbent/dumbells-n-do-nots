import { RECEIVE_ALL_EXERCISES_BY_MUSCLE_GROUP, RECEIVE_USER_EXERCISES, RECEIVE_NEW_EXERCISE, RECEIVE_ALL_EXERCISES } from '../actions/ExerciseActions';

const ExercisesReducer = (state={}, action) =>{
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_ALL_EXERCISES_BY_MUSCLE_GROUP:
            newState = action.exercises.data;
            return newState;
        case RECEIVE_ALL_EXERCISES:
            newState = action.exercises.data;
            return newState;
        case RECEIVE_USER_EXERCISES:
            Object.assign(newState, { [action.exercises.id]: action.exercises })
            return newState;
        case RECEIVE_NEW_EXERCISE:
            Object.assign(newState, { [action.exercises.id]: action.exercises })
            return newState;
        default:
            return state;
    }
};

export default ExercisesReducer;