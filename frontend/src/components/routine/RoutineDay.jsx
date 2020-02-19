import React from 'react';
import {connect} from "react-redux";
import MealItem from "../meals/MealItem";
import DateFormat from 'dateformat'
import { updateRoutine } from '../../actions/RoutineActions'
import "../../scss/routines/RoutineDay.scss"
const mapStateToProps = ({entities}, ownProps) => {
    const workout = entities.workouts[ownProps.day.workout];
    return {
        meals: entities.meals,
        userMeals: ownProps.day.meals.map(d => entities.userMeals[d]),
        workout,
        exercises: workout ? workout.exercises.map(id => entities.exercises[id]) : []
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateRoutine: data => dispatch(updateRoutine(data)),
})

const RoutineDay = ({updateRoutine, workout, editable, day, routine, userMeals, meals, exercises, modal = false, idx, editDay = null }) => {
    function check(id, value) {
        if(!id){
            if (workout.doneCheck === false){
                workout.doneCheck = true
            } else {
                workout.doneCheck = false
            }
            updateRoutine({dayId: day._id, completableType: 'workout', completableId: workout._id})
        } else {
            updateRoutine({dayId: day._id, completableType: 'meal', completableId: id, doneAmount: value})
        }
    }
    if (!day) return null;
    const readableDay = !modal ? DateFormat(new Date(day.date), 'yyyy-mm-dd'): `Day ${idx + 1}`;
    return (
        <div className="RoutineDay">
            <div className="day-title">
                {readableDay}
            </div>
            <div className="day-meals">
                <div className="meal-title">Meals</div>
                {userMeals.map((userMeal) => {
                    if (!userMeal) return null;
                    const meal = meals[userMeal.meal];
                    return (
                        <div key={userMeal._id}>
                            {Object.keys([...new Array(userMeal.quantity)]).map((key, idx) => {
                                return <MealItem meal={meal} key={key} handleMealCheck={() => check(userMeal._id, idx + 1 <= meal.doneAmount ? -1 : 1)}/>
                            })}
                        </div>
                    )
                })}
            </div>
            {exercises.length > 0 && <div className="day-workout">
                <div className="workout-title"><span>Workout</span></div>
                {exercises.map((ex, idx) => {
                    return <div key={idx} className="day-exercise">{ex.name}</div>
                })}
            </div>}
            {!!editable && <div className="edit-day" onClick={() => editDay(day)}>Edit Day</div>}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutineDay);