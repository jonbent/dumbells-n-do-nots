import { RECEIVE_MUSCLE_GROUPS } from '../actions/MuscleGroupActions';

export default (prevState = {}, action)=>{
    Object.freeze(prevState);
    let nextState = {}
    switch (action.type) {
        case RECEIVE_MUSCLE_GROUPS:
            nextState= Object.assign(nextState, prevState, action.payload);
            return nextState; 
        default:
            return prevState;
    }
}