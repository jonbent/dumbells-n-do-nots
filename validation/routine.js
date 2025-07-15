import Validator from 'validator';
import validText from './valid-text.js';
import Meal from '../models/Meal.js';
import Exercise from '../models/Exercise.js';
const validateRoutineInput = async (data) => {
    if (!data) return {
        errors: {routine: "Must be provided"},
        isValid: false
    };
    const days = Object.keys(data);
    if (days.length !== 7) return {
        errors: {routine: "Must have 7 valid dates"},
        isValid: false
    };

    let errors = {};

    let allMeals = {};
    let allExercises = [];
    let prevDate = new Date(days[0]);
    for(let i = 0; i < days.length; i++){
        if (!Validator.toDate(days[i])) errors.dates = "Keys must be valid date strings.";
        if (i > 0){
            const curDate = new Date(days[i]);
            if (prevDate.getDate() !== curDate.getDate() && prevDate.getMonth() !== curDate.getMonth() && prevDate.getFullYear() !== curDate.getFullYear()) errors.routine = "Dates must be consecutive."
            prevDate.setDate(prevDate.getDate() + 1);
        }
        data[days[i]].workout = Object.keys(data[days[i]].workout).filter(ex => data[days[i]].workout[ex] === true);
        Object.assign(allMeals, data[days[i]].meals);
        allExercises = allExercises.concat(data[days[i]].workout);
    }
    const allExercisesHash = {};
    allExercises.forEach(el => allExercisesHash[el] = true);
    allExercises = Object.keys(allExercisesHash);
    allMeals = Object.keys(allMeals);
    const foundMeals = await Meal.find({_id: { $in: allMeals}});
    const foundExercises = await Exercise.find({_id: { $in: allExercises}});
    if (allMeals.length !== foundMeals.length) errors.meals = "Invalid meals have been inserted";
    if (allExercises.length !== foundExercises.length) errors.exercises = "Invalid exercises have been inserted";

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}
export default validateRoutineInput;
