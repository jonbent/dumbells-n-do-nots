import * as RoutineApiUtil from '../util/RoutineApiUtil';
import {resetSelectedMuscleGroups} from '../actions/MuscleGroupActions'
export const RECEIVE_USER_ROUTINES = "RECEIVE_USER_ROUTINES";
export const RECEIVE_USER_ROUTINE = "RECEIVE_USER_ROUTINE";
export const RECEIVE_NEW_ROUTINE = "RECEIVE_NEW_ROUTINE";

export const receiveUserRoutine = payload => ({
    type: RECEIVE_USER_ROUTINE,
    payload
});
export const receiveUserRoutines = payload => ({
    type: RECEIVE_USER_ROUTINES,
    payload
});

export const receiveNewRoutine = routine => ({
    type: RECEIVE_NEW_ROUTINE,
    routine
})

export const fetchUserRoutine = id => dispatch => (
    RoutineApiUtil.getUserRoutine(id)
        .then(res => dispatch(receiveUserRoutine(res.data)))
        
);

export const updateRoutineChecks = data => dispatch => (
    RoutineApiUtil.updateRoutineChecks(data)
        .then(res => {
            return dispatch(receiveUserRoutine(res.data))})
        
);

export const fetchUserRoutines = id => dispatch => (
    RoutineApiUtil.getUserRoutines(id)
        .then(res => dispatch(receiveUserRoutines(res.data)))
        
);

export const createRoutine = data => dispatch => (
    RoutineApiUtil.createRoutine(data)
        .then(routine => {dispatch(receiveNewRoutine(routine)); dispatch(resetSelectedMuscleGroups())})
        
);

export const fetchRoutineById = id => dispatch => {
    return RoutineApiUtil.getRoutineById(id)
        .then(res => dispatch(receiveUserRoutine(res.data)))
        
}

export const toggleExercise = (dayId, exerciseId) => dispatch => {
    return RoutineApiUtil.toggleExercise(dayId, exerciseId)
        .then(res => dispatch(receiveUserRoutine(res.data)))
        
}
export const updateDaysMeal = (dayId, mealId, val) => dispatch => {
    return RoutineApiUtil.updateDaysMeal(dayId, mealId, val)
        .then(res => dispatch(receiveUserRoutine(res.data)))
        
}