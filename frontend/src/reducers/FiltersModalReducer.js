import {OPEN_FILTERS_MODAL, CLOSE_FILTERS_MODAL} from "../actions/FiltersModalActions";

export default (prevState = "", action) => {
    switch(action.type){
        case OPEN_FILTERS_MODAL:
            return action.modal;
        case CLOSE_FILTERS_MODAL:
            return "";
        default:
            return prevState;
    }
}