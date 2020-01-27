import {RECEIVE_USER} from '../actions/UserActions'

export default (prevState = {}, action)=> {
    Object.freeze(prevState);
    let nextState = {};
    switch (action.type) {
        case RECEIVE_USER:
            nextState = Object.assign(nextState, prevState, { [action.payload.user.username]: action.payload.user })
            return nextState;
    
        default:
            return prevState;
    }
}