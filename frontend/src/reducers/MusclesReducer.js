import { RECEIVE_MUSCLES } from '../actions/MuscleActions';

export default (prevState = {}, action) => {
    Object.freeze(prevState);
    let nextState = {}
    switch (action.type) {
        case RECEIVE_MUSCLES:
            nextState = Object.assign(nextState, prevState, action.payload);
            return nextState;
        default:
            return prevState;
    }
}