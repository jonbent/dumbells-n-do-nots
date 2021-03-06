import {createRoutine, editRoutine} from '../util/RoutineApiUtil'
import {closeModal} from "./ModalActions";
import {receiveUserRoutine} from "./RoutineActions";

export const RECEIVE_NEW_ROUTINE_STARTDATE = "RECEIVE_NEW_ROUTINE_STARTDATE";
export const RECEIVE_NEW_ROUTINE_STARTDATE_WITH_DATA = "RECEIVE_NEW_ROUTINE_STARTDATE_WITH_DATA";
export const RECEIVE_ROUTINE_MEALS = "RECEIVE_ROUTINE_MEALS";
export const RECEIVE_ROUTINE_WORKOUTS = "RECEIVE_ROUTINE_WORKOUTS";
export const CLEAR_NEW_ROUTINE_DATA = "CLEAR_NEW_ROUTINE_DATA";
export const RECEIVE_DAY_EXERCISE = "RECEIVE_DAY_EXERCISE";
export const RECEIVE_ROUTINE_ERRORS = "RECEIVE_ROUTINE_ERRORS";

export const receiveRoutineErrors = errors => {
    return {
        type: RECEIVE_ROUTINE_ERRORS,
        errors
    }
};

export const receiveNewRoutineStartDate = payload => ({
    type: RECEIVE_NEW_ROUTINE_STARTDATE,
    payload
});

export const receiveNewRoutineStartDateWithData = payload => ({
    type: RECEIVE_NEW_ROUTINE_STARTDATE_WITH_DATA,
    payload
});

export const receiveRoutineMeals = newRoutine => ({
    type: RECEIVE_ROUTINE_MEALS,
    newRoutine
});
export const receiveRoutineExercise = payload => ({
    type: RECEIVE_DAY_EXERCISE,
    payload
});

export const receiveRoutineWorkouts = payload => ({
    type: RECEIVE_ROUTINE_WORKOUTS,
    payload
}) ;

export const clearNewRoutineData = payload => ({
    type: CLEAR_NEW_ROUTINE_DATA,
    payload
});

export const submitRoutine = routine => dispatch => {
    return createRoutine(routine).then(res => {
        localStorage.setItem('routineEdit', res.data.routine._id);
        return dispatch(receiveUserRoutine(res.data))
    })
};
export const submitEdit = (day, routineDay) => dispatch => {
    return editRoutine(day, routineDay).then(res => {
        return dispatch(receiveUserRoutine(res.data))
    })
};

export const submitRoutineAndCloseModal = routine => dispatch => (
    createRoutine(routine).then(res => {
    dispatch(receiveUserRoutine(res.data)); return dispatch(closeModal())})
);