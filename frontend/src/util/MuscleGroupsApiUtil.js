import axios from 'axios';

export const fetchMuscleGroups = ()=>{
    return axios.get('/api/muscleGroups')
}