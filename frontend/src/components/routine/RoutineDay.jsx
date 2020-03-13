import React from 'react';
import {connect} from "react-redux";
import MealItem from "../meals/MealItem";
import DateFormat from 'dateformat'
import { updateRoutineChecks } from '../../actions/RoutineActions'
import "../../scss/routines/RoutineDay.scss"
const mapStateToProps = ({entities, ui}, ownProps) => {
    const workout = entities.workouts[ownProps.day.workout];
    return {
        meals: entities.routineMeals,
        userMeals: ownProps.day.meals.map(d => entities.userMeals[d]),
        workout,
        exercises: workout ? workout.exercises.map(id => entities.exercises[id]) : [],
        newRoutineData: ui.newRoutineData
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateRoutineChecks: data => {
        return dispatch(updateRoutineChecks(data))
    },
})

const RoutineDay = ({ updateRoutineChecks, workout, editable, day, routine, userMeals, meals, exercises, modal = false, idx, editDayWorkout = null, editDayMeals = null, newRoutineData, history = false }) => {
    function check(id, value) {
        if(!id){
            let doneCheck = false
            if (workout.doneCheck === false){
                doneCheck = true
            }
            updateRoutineChecks({dayId: day._id, completableType: 'workout', completableId: workout._id, doneCheck})
        } else {
            updateRoutineChecks({dayId: day._id, completableType: 'meal', completableId: id, doneAmount: value})
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
            {userMeals.length !== 0 && <div className="day-meals">
                <div className="meal-title">Meals</div>
                {userMeals.map((userMeal) => {
                    if (!userMeal) return null;
                    const meal = meals[userMeal.meal];
                    return (
                        <div key={userMeal._id}>
                            {Object.keys([...new Array(userMeal.quantity)]).map((key, idx) => {
                                return <MealItem meal={meal} key={key} selected={idx + 1 <= userMeal.doneAmount && !history ? true : false} handleMealCheck={() => !history ? check(userMeal._id, idx + 1 <= userMeal.doneAmount ? -1 : 1) : null}/>
                            })}
                        </div>
                    )
                })}
            </div>}
            {exercises.length > 0 && <div className={`day-workout ${workout.doneCheck === true ? "workout-done" : ""}`} onClick={() => !history ? check() : null}>
                <div className="workout-title"><span>Workout</span><span className="check"></span></div>
                {exercises.map((ex, idx) => {
                    return <div key={idx} className="day-exercise">{ex.name}</div>
                })}
            </div>}
            {!!editable && <div className="edit-day" onClick={() => editDayMeals ? editDayMeals(day) : editDayMeals}>Edit Meals</div>}
            {!!editable && <div className="edit-day" onClick={() => editDayWorkout ? editDayWorkout(day) : editDayWorkout}>Edit Workout</div>}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutineDay);