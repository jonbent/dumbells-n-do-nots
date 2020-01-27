import * as MusclesAPIUtil from '../util/MusclesApiUtil';
import jwt_decode from 'jwt-decode';


export const RECEIVE_MUSCLES = 'RECEIVE_MUSCLES';

const receiveMuscleGroups = (payload) => ({
    type: RECEIVE_MUSCLES,
    payload
});

export const fetchMuscles = () => dispatch => (
    MusclesAPIUtil.fetchMusclesUtil()
        .then(res => {
            dispatch(receiveMuscleGroups(res))
        })

);