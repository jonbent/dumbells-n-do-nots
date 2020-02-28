import axios from 'axios';

export const getAllExercises = () => {
    return axios.get(`/api/exercises`)
};


export const getAllExercisesByMuscleGroup = muscleGroupIds => {
    return axios.get(`/api/exercises/`, {params: {muscleGroupIds}})
};

export const getUserExercises = id => {
    return axios.get(`/api/exercises/user/${id}`)
};

export const createExercise = data => {
    return axios.post('/api/exercises', data)
};