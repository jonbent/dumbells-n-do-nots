import { RECEIVE_DAY_SELECTED, RECEIVE_NUM_MEALS } from '../actions/RoutineFilterActions'
import { RECEIVE_NEW_ROUTINE_STARTDATE } from '../actions/NewRoutineActions';
import {CLOSE_MODAL, OPEN_MODAL} from "../actions/ModalActions";
import {RECEIVE_SELECTED_MUSCLE_GROUP, RECEIVE_SIDE} from "../actions/RoutineFilterActions";
import {RESET_SELECTED_MUSCLE_GROUPS} from "../actions/MuscleGroupActions";
const _nullState = {
    side: "front",
    Arms: false,
    Legs: false,
    Shoulders: false,
    Calves: false,
    Abs: false,
    Chest: false,
    Back: false,
    hoverArms: false,
    hoverLegs: false,
    hoverShoulders: false,
    hoverCalves: false,
    hoverAbs: false,
    hoverChest: false,
    hoverBack: false,
};
export default function (state = _nullState, action) {
    Object.freeze(state);
    let nextState = {};
    switch (action.type) {
        case RECEIVE_DAY_SELECTED:
            return Object.assign({}, state, { daySelected: action.day });
        case RECEIVE_GOAL_PATH:
            return Object.assign({}, state, { minCals: action.cals - 500, maxCals: action.cals });
        case RECEIVE_NUM_MEALS:
            return Object.assign({}, state, { numMeals: action.num });
        case RECEIVE_NEW_ROUTINE_STARTDATE:
            localStorage.setItem('defaultStartDate', action.payload);
            return Object.assign({}, state, { daySelected: action.payload });
        case CLOSE_MODAL:
            nextState = Object.assign(nextState, state);
            delete nextState.daySelected;
            delete nextState.numMeals;
            return nextState;
        case RECEIVE_SELECTED_MUSCLE_GROUP:
            return Object.assign({}, state, { [action.muscleGroup]: !state[action.muscleGroup] });
        case RESET_SELECTED_MUSCLE_GROUPS:
            nextState = Object.assign(nextState, state);
            localStorage.removeItem('defaultStartDate');
            Object.keys(nextState).forEach(key => nextState[key] = nextState[key] === true ? false : nextState[key]);
            return nextState;
        case RECEIVE_SIDE:
            return Object.assign({}, state, { side: action.side });
        case OPEN_MODAL:
            return Object.assign({}, state, { daySelected: localStorage.getItem('defaultStartDate') });
        default:
            return state;
    }
}
