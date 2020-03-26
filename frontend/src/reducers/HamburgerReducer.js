import {OPEN_HAMBURGER, CLOSE_HAMBURGER} from '../actions/HamburgerActions'
export default (prevState = false, action) => {
    switch(action.type){
        case OPEN_HAMBURGER:
            return true;
        case CLOSE_HAMBURGER:
            return null;
        default:
            return null;
    }
}