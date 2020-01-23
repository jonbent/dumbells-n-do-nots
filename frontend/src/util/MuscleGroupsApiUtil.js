import axios from 'axios';

export const fetchMuscleGroupsUtil = ()=>{
    return axios.get('/api/muscleGroups')
}