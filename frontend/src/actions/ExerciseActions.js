import * as ExerciseApiUtil from '../util/ExercisesApiUtil';

export const RECEIVE_ALL_EXERCISES_BY_MUSCLE_GROUP = "RECEIVE_ALL_EXERCISES_BY_MUSCLE_GROUP"; 
export const RECEIVE_ALL_EXERCISES = "RECEIVE_ALL_EXERCISES";
export const RECEIVE_USER_EXERCISES = "RECEIVE_USER_EXERCISES";
export const RECEIVE_NEW_EXERCISE = "RECEIVE_NEW_EXERCISE";

export const receiveAllExercises = exercises =>({
    type: RECEIVE_ALL_EXERCISES,
    exercises
});

export const receiveAllExercisesByMuscleGroup = exercises => ({
    type: RECEIVE_ALL_EXERCISES_BY_MUSCLE_GROUP,
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

export const fetchAllExercises = () => dispatch => (
    ExerciseApiUtil.getAllExercises()
        .then(exercises => dispatch(receiveAllExercises(exercises)))
        .catch(err => console.log(err))
)

export const fetchAllExercisesByMuscleGroup = id => dispatch =>(
    ExerciseApiUtil.getAllExercisesByMuscleGroup()
        .then(exercises => dispatch(receiveAllExercisesByMuscleGroup(exercises)))
        .catch(err => console.log(err))
)

export const fetchUserExercises = id => dispatch => (
    ExerciseApiUtil.getUserExercises(id)
        .then(exercise => dispatch(receiveUserExercises(exercise)))
        .catch(err => console.log(err))
);

export const createExercises = data => dispatch => (
    ExerciseApiUtil.createExercises(data)
        .then(exercise => dispatch(receiveNewExercises(exercise)))
        .catch(err => console.log(err))
);




