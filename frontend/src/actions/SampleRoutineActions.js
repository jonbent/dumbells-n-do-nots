import { getSampleRoutines } from '../util/RoutineApiUtil';

export const RECEIVE_SAMPLE_ROUTINES = "RECEIVE_SAMPLE_ROUTINES";

export const receiveSampleRoutines = sampleRoutines => ({
    type: RECEIVE_SAMPLE_ROUTINES,
    sampleRoutines
});

export const fetchSampleRoutines = () => dispatch => (
    getSampleRoutines()
        .then(sampleRoutines => dispatch(receiveSampleRoutines(sampleRoutines)))
        .catch(err => console.log(err))
);