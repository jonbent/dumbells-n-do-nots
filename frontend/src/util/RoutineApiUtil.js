import axios from 'axios';

export const getSampleRoutines = () => {
    return axios.get('/api/routines/sample')
};

export const getUserRoutine = id => {
    return axios.get(`/api/routines/user/${id}/single`)
};

export const getUserRoutines = id => {
    return axios.get(`/api/routines/user/${id}`)
};

export const createRoutine = data => {
    return axios.post('/api/routines/', data)
}

export const editRoutine = (day, routineDay) => {
    return axios.put(`/api/routines/${day.routine}/days/${day._id}`, routineDay);
};

export const updateRoutineChecks = data => {
    return axios.put(`/api/routines/days/${data.dayId}/${data.completableType}/${data.completableId}`, {doneAmount: data.doneAmount, doneCheck: data.doneCheck})
}

export const getRoutineById = id => {
    return axios.get(`/api/routines/${id}`)
}

export const fetchRoutineByStartDate = (startDate) => {
    return axios.get('/api/routines/startDate', {params: {startDate}})
}

export const updateRoutine = (routineId, routine) => {
    return axios.put(`/api/routines/${routine._id}`)
}