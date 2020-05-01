import {getDaysAfterToday} from "../util/RoutineApiUtil";


export const RECEIVE_DAYS = "RECEIVE_DAYS";

export const receiveDays = (days) => {
    return {
        type: RECEIVE_DAYS,
        days
    };
};

export const fetchDaysAfterToday = () => dispatch => {
    return getDaysAfterToday().then(res => dispatch(receiveDays(res.data.days)))
};