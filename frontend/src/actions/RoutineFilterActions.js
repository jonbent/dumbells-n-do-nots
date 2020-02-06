export const RECEIVE_DAY_SELECTED = "RECEIVE_DAY_SELECTED";
export const RECEIVE_NUM_MEALS = "RECEIVE_NUM_MEALS";

export const receiveDaySelected = day => ({
    type: RECEIVE_DAY_SELECTED,
    day
})

export const receiveNumMeals = num => ({
    type: RECEIVE_NUM_MEALS,
    num
})