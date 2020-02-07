import { RECEIVE_NEW_ROUTINE_STARTDATE,
         RECEIVE_ROUTINE_MEALS,
         RECEIVE_ROUTINE_WORKOUTS,
         CLEAR_NEW_ROUTINE_DATA } from '../actions/NewRoutineActions';
import DateFormat from 'dateformat';
import { RECEIVE_NUM_MEALS } from '../actions/RoutineFilterActions'
import {CLOSE_MODAL} from "../actions/ModalActions";

const NewRoutinesReducer = (state = {}, action) => {
    let nextState = {};
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_NEW_ROUTINE_STARTDATE:
            let startDate =  action.payload;
            let newStartDate = new Date(startDate);
            for(let i = 0; i < 7; i++){
                let formattedDate;
                newStartDate.setDate(newStartDate.getDate() + 1);
                formattedDate = DateFormat(newStartDate, 'yyyy-mm-dd')
                nextState[formattedDate] = {meals:{}, workouts:{}}
            }
            return nextState
        case RECEIVE_ROUTINE_MEALS:
            return Object.assign({}, state, action.newRoutine)
        case RECEIVE_ROUTINE_WORKOUTS:
            return Object.assign({}, state, action.payload.days)
        case CLEAR_NEW_ROUTINE_DATA:
            return {}
        case RECEIVE_NUM_MEALS:
            nextState = Object.assign(nextState, state)
            Object.values(nextState).forEach(day => day.meals = {})
            return nextState;
        case CLOSE_MODAL:
            return {};
        default:
            return state;
    }
};

export default NewRoutinesReducer;