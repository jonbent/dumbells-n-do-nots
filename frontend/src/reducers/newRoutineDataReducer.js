import { RECEIVE_NEW_ROUTINE_STARTDATE,
         RECEIVE_ROUTINE_MEALS,
         RECEIVE_ROUTINE_WORKOUTS,
         CLEAR_NEW_ROUTINE_DATA } from '../actions/NewRoutineActions';
import DateFormat from 'dateformat';

const NewRoutinesReducer = (state = {}, action) => {
    let nextState = {};
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_NEW_ROUTINE_STARTDATE:
            let startDate =  action.payload.startDate;
            for(let i = 0; i < 7; i++){
                let formattedDate;
                if(i === 0){
                    formattedDate = DateFormat(startDate, "yyyy-mm-dd")
                } else {
                    formattedDate = DateFormat(startDate.setDate(startDate.getDate() + 1), 'yyyy-mm-dd')
                }
                nextState[formattedDate] = {}
            }
            return nextState
        case RECEIVE_ROUTINE_MEALS:
            return Object.assign({}, state, action.payload.days)
        case RECEIVE_ROUTINE_WORKOUTS:
            return Object.assign({}, state, action.payload.days)
        case CLEAR_NEW_ROUTINE_DATA:
            return {}
        default:
            return state;
    }
};

export default NewRoutinesReducer;