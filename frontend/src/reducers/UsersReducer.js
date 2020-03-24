import {RECEIVE_USER} from '../actions/UserActions'
import {RECEIVE_CURRENT_USER} from "../actions/SessionActions";

export default (prevState = {}, action)=> {
    Object.freeze(prevState);
    let nextState = {};
    switch (action.type) {
        case RECEIVE_USER:
            nextState = Object.assign(nextState, prevState, { [action.payload.user.username]: action.payload.user });
            return nextState;
        case RECEIVE_CURRENT_USER:
            nextState = Object.assign(nextState, prevState, { [action.currentUser.username]: action.currentUser });
            return nextState;
        default:
            return prevState;
    }
}