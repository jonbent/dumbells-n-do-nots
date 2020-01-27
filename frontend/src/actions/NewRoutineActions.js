export const RECEIVE_NEW_ROUTINE_STARTDATE = "RECEIVE_NEW_ROUTINE_STARTDATE";
export const RECEIVE_ROUTINE_MEALS = "RECEIVE_ROUTINE_MEALS";
export const RECEIVE_ROUTINE_WORKOUTS = "RECEIVE_ROUTINE_WORKOUTS";
export const CLEAR_NEW_ROUTINE_DATA = "CLEAR_NEW_ROUTINE_DATA";


export const receiveNewRoutineStartDate = payload => ({
    type: RECEIVE_NEW_ROUTINE_STARTDATE,
    payload
}) 

export const receiveRoutineMeals = payload => ({
    type: RECEIVE_ROUTINE_MEALS,
    payload
}) 

export const receiveRoutineWorkouts = payload => ({
    type: RECEIVE_ROUTINE_WORKOUTS,
    payload
}) 

export const clearNewRoutineData = payload => ({
    type: CLEAR_NEW_ROUTINE_DATA,
    payload
})

