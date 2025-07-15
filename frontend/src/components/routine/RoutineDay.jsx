import React, {useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import MealItem from "../meals/MealItem";
import DateFormat from 'dateformat'
import { updateRoutineChecks } from '../../actions/RoutineActions'
import "../../scss/routines/RoutineDay.scss"
import {receiveMealDetails} from "../../actions/MealActions";


const RoutineDay = ({editable, day, routine, modal = false, idx, editDayWorkout = null, editDayMeals = null, history = false }) => {
    const meals = useSelector(({entities}) => entities.routineMeals);
    const workout = useSelector(({entities}) => entities.workouts[day.workout]);
    const selectorExercises = useSelector(({entities}) => entities.exercises);
    const exercises = useMemo(() => {
        return workout ?  workout.exercises.map(id => selectorExercises[id]) : [];
    }, [selectorExercises, workout]);
    const selectorUserMeals = useSelector(({entities}) => entities.userMeals);
    const userMeals = useMemo(() => {
        return day.meals.map(d => selectorUserMeals[d])
    }, [day, selectorUserMeals])
    const newRoutineData = useSelector(({ui}) => ui.newRoutineData);
    const dispatch = useDispatch();
    function check(id, value) {
        if(!id){
            let doneCheck = false
            if (workout.doneCheck === false){
                doneCheck = true
            }
            dispatch(updateRoutineChecks({dayId: day._id, completableType: 'workout', completableId: workout._id, doneCheck}))
        } else {
            dispatch(updateRoutineChecks({dayId: day._id, completableType: 'meal', completableId: id, doneAmount: value}))
        }
    }
    if (!day) return null;
    const readableDay = editable ?
        Object.keys(newRoutineData)[idx] :
            !isNaN(idx) ?
                `Day ${idx + 1}` :
             DateFormat(new Date(day.date), "mm/dd/yyyy");
    return (
        <div className="RoutineDay">
            <div className="day-title">
                {readableDay}
            </div>
            {userMeals.length === 0 && exercises.length === 0 && (
                <div className="routine-none-found">No Meal or workout found for this day</div>
            )}
            {userMeals.length !== 0 && <div className="day-meals">
                <div className="meal-title">Meals</div>
                {userMeals.map((userMeal) => {
                    if (!userMeal) return null;
                    const meal = meals[userMeal.meal];
                    return (
                        <div key={userMeal._id}>
                            {Object.keys([...new Array(userMeal.quantity)]).map((key, idx) => {
                                console.log(meal);
                                return <MealItem
                                    meal={meal}
                                    key={`${String(meal._id)}1${idx}`}
                                    selected={idx + 1 <= userMeal.doneAmount && !history ? true : false}
                                    handleMealCheck={() => !history ?
                                        check(userMeal._id, idx + 1 <= userMeal.doneAmount ? -1 : 1)
                                        : null
                                    }
                                    openModal={() => (
                                        !history ? dispatch(receiveMealDetails({"spoonacularId": meal.spoonacularId})) : null
                                    )}
                                />
                            })}
                        </div>
                    )
                })}
            </div>}
            {!!editable && <div className="edit-day" onClick={() => editDayMeals ? editDayMeals(day) : editDayMeals}>Edit Meals</div>}
            {exercises.length !== 0 && <div className={`day-workout ${workout.doneCheck === true ? "workout-done" : ""}`} onClick={() => !history ? check() : null}>
                <div className="workout-title"><span>Workout</span></div>
                {exercises.map((ex, idx) => {
                    return <div key={idx} className="day-exercise"><span>{ex.name}</span><span className="check"></span></div>
                })}
            </div>}

            {!!editable && <div className="edit-day" onClick={() => editDayWorkout ? editDayWorkout(day) : editDayWorkout}>Edit Workout</div>}
        </div>
    );
};

export default RoutineDay;
