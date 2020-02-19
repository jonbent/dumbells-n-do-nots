import { OPEN_MODAL, CLOSE_MODAL } from '../actions/ModalActions';
import {RECEIVE_SELECTED_ROUTINE} from "../actions/RoutineFilterActions";

export default function modalReducer(state = null, action) {
    switch (action.type) {
        case OPEN_MODAL:
            return action.modal;
        case CLOSE_MODAL:
            return null;
        case RECEIVE_SELECTED_ROUTINE:
            return "existingRoutine";
        default:
            return state;
    }
}
