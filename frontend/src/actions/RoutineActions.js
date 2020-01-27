import * as RoutineApiUtil from '../util/RoutineApiUtil';

export const RECEIVE_USER_ROUTINE = "RECEIVE_USER_ROUTINE";
export const RECEIVE_NEW_ROUTINE = "RECEIVE_NEW_ROUTINE";

export const receiveUserRoutine = routine => ({
    type: RECEIVE_USER_ROUTINE,
    routine
});

export const receiveNewRoutine = routine => ({
    type: RECEIVE_NEW_ROUTINE,
    routine
})

export const fetchUserRoutine = id => dispatch => (
    RoutineApiUtil.getUserRoutine(id)
        .then(routine => dispatch(receiveUserRoutine(routine)))
        .catch(err => console.log(err))
);

export const createRoutine = data => dispatch => (
    RoutineApiUtil.createRoutine(data)
        .then(routine => dispatch(receiveNewRoutine(routine)))
        .catch(err => console.log(err))
);