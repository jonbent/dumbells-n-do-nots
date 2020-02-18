export const RECEIVE_DAY_SELECTED = "RECEIVE_DAY_SELECTED";
export const RECEIVE_NUM_MEALS = "RECEIVE_NUM_MEALS";
export const RECEIVE_SIDE = "RECEIVE_SIDE";
export const RECEIVE_SELECTED_MUSCLE_GROUP = 'RECEIVE_SELECTED_MUSCLE_GROUP';
export const RECEIVE_SELECTED_ROUTINE = 'RECEIVE_SELECTED_ROUTINE';

export const receiveDaySelected = day => ({
    type: RECEIVE_DAY_SELECTED,
    day
});
export const receiveSelectedRoutine = routine => ({
    type: RECEIVE_SELECTED_ROUTINE,
    routine
});

export const receiveNumMeals = num => ({
    type: RECEIVE_NUM_MEALS,
    num
});

export const receiveSide = side => ({
    type: RECEIVE_SIDE,
    side
});

export const receiveSelectedMuscleGroups = (muscleGroup) => ({
    type: RECEIVE_SELECTED_MUSCLE_GROUP,
    muscleGroup
});