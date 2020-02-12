import { RECEIVE_MUSCLE_GROUPS } from '../actions/MuscleGroupActions';

export default (prevState = {}, action)=>{
    Object.freeze(prevState);
    let nextState = {}
    switch (action.type) {
        case RECEIVE_MUSCLE_GROUPS:
            const muscleGroup = {};
            action.payload.data.forEach(element => {
                muscleGroup[element._id] = element;
            });
            nextState= Object.assign(nextState, prevState, muscleGroup);
            return nextState; 
        default:
            return prevState;
    }
}