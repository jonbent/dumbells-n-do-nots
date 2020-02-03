import * as MuscleGroupsAPIUtil from '../util/MuscleGroupsApiUtil';
// import jwt_decode from 'jwt-decode';


export const RECEIVE_MUSCLE_GROUPS = 'RECEIVE_MUSCLE_GROUPS';

const receiveMuscleGroups = (payload) => ({
    type: RECEIVE_MUSCLE_GROUPS,
    payload
});

export const fetchMuscleGroups = () => dispatch =>(
    MuscleGroupsAPIUtil.fetchMuscleGroups()
        .then(res =>{
            dispatch(receiveMuscleGroups(res))
        })
        
);