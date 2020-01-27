import axios from 'axios';

export const fetchMusclesUtil = () => {
    return axios.get('/api/muscles')
}