import * as ExerciseApiUtil from '../util/ExercisesApiUtil';

export const RECEIVE_EXERCISES_BY_MUSCLE_GROUPS = "RECEIVE_EXERCISES_BY_MUSCLE_GROUPS";
export const RECEIVE_ALL_EXERCISES = "RECEIVE_ALL_EXERCISES";
export const RECEIVE_USER_EXERCISES = "RECEIVE_USER_EXERCISES";
export const RECEIVE_NEW_EXERCISE = "RECEIVE_NEW_EXERCISE";
export const RECEIVE_EXERCISE_ERRORS = "RECEIVE_EXERCISE_ERRORS";

export const receiveAllExercises = exercises =>({
    type: RECEIVE_ALL_EXERCISES,
    exercises
});

export const receiveExercisesByMuscleGroups = exercises => ({
    type: RECEIVE_EXERCISES_BY_MUSCLE_GROUPS,
    exercises
});

export const receiveUserExercises = exercises => ({
    type: RECEIVE_USER_EXERCISES,
    exercises
})

export const receiveNewExercises = exercise =>({
    type: RECEIVE_NEW_EXERCISE,
    exercise
});
export const receiveNewExercise = exercise =>({
    type: RECEIVE_NEW_EXERCISE,
    exercise
});
export const receiveExerciseErrors = errors =>({
    type: RECEIVE_EXERCISE_ERRORS,
    errors
});

export const fetchAllExercises = () => dispatch => (
    ExerciseApiUtil.getAllExercises()
        .then(exercises => dispatch(receiveAllExercises(exercises)))
        
)

export const fetchExercisesByMuscleGroups = ids => dispatch =>(
    ExerciseApiUtil.getAllExercisesByMuscleGroup(ids)
        .then(exercises => dispatch(receiveExercisesByMuscleGroups(exercises)))
        
)

export const fetchUserExercises = id => dispatch => (
    ExerciseApiUtil.getUserExercises(id)
        .then(exercise => dispatch(receiveUserExercises(exercise)))
        
);

export const createExercise = data => dispatch => (
    ExerciseApiUtil.createExercise(data)
        .then(res => dispatch(receiveNewExercise(res.data.newExercise)))
        .catch(err => {
            dispatch(receiveExerciseErrors(err.response.data));
            throw "Exercise failed to create with given info";
        })
);

