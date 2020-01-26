import axios from 'axios';

export const getAllExercises = () => {
    return axios.get(`/api/exercises`)
};


export const getAllExercisesByMuscleGroup = id => {
    return axios.get(`/api/muscleGroups/${id}`)
};

export const getUserExercises = id => {
    return axios.get(`/api/exercises/user/${id}`)
};

export const createExercises = data => { 
    return axios.post('/api/exercises', data)
};