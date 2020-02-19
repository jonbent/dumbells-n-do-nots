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
    updateRoutine: id => dispatch(updateRoutine(id)),
})

const RoutineDay = ({ editable, day, routine, userMeals, meals, exercises, modal = false, idx, editDay = null }) => {
    function checkMeal(id) {
        if (userMeals[id].doneAmount ){
            userMeals[id].doneAmount = true
        } else {
            userMeals[id].doneAmount = false
        }
        updateRoutine(day.routine)
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
                    const meal = meals[userMeal.meal];
                    return (
                        <div key={userMeal._id}>
                            {Object.keys([...new Array(userMeal.quantity)]).map((key) => {
                                return <MealItem meal={meal} key={key} handleMealCheck={() => checkMeal(idx)}/>
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