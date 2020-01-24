import { RECEIVE_SAMPLE_ROUTINES } from '../actions/SampleRoutineActions';

const SampleRoutinesReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_SAMPLE_ROUTINES:
            newState = action.sampleRoutines;
            return newState;
        default:
            return state;
    }
};

export default SampleRoutinesReducer;