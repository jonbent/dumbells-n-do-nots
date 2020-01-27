import axios from 'axios';

export const getAllExercises = () => {
    return axios.get(`/api/exercises`)
};


export const getAllExercisesByMuscleGroup = ids => {
    return axios.post(`/api/exercises/`, ids)
};

export const getUserExercises = id => {
    return axios.get(`/api/exercises/user/${id}`)
};

export const createExercises = data => { 
    return axios.post('/api/exercises', data)
};