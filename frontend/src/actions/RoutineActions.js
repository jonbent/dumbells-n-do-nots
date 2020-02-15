import * as RoutineApiUtil from '../util/RoutineApiUtil';

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
        .catch(err => console.log(err))
);
export const fetchUserRoutines = id => dispatch => (
    RoutineApiUtil.getUserRoutines(id)
        .then(res => dispatch(receiveUserRoutines(res.data)))
        .catch(err => console.log(err))
);

export const createRoutine = data => dispatch => (
    RoutineApiUtil.createRoutine(data)
        .then(routine => dispatch(receiveNewRoutine(routine)))
        .catch(err => console.log(err))
);