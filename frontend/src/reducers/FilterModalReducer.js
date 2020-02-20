import {OPEN_FILTERS_MODAL} from "../actions/FilterModalActions";

export default (prevState = "", action) => {
    switch(action.type){
        case OPEN_FILTERS_MODAL:
            return action.modal;
        default:
            return prevState;
    }
}