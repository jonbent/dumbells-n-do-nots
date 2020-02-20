import React from 'react';
import {connect} from "react-redux";
import MealItem from "../meals/MealItem";
import DateFormat from 'dateformat';
import "../../scss/routines/RoutineDay.scss"
const mapStateToProps = ({entities, ui}, ownProps) => {
    const workout = entities.workouts[ownProps.day.workout];
    return {
        meals: entities.meals,
        userMeals: ownProps.day.meals.map(d => entities.userMeals[d]),
        workout,
        exercises: workout ? workout.exercises.map(id => entities.exercises[id]) : [],
        newRoutineData: ui.newRoutineData
    }
};


const RoutineDay = ({editable, day, routine, userMeals, meals, exercises, idx, editDayWorkout = null, editDayMeals = null, newRoutineData}) => {
    if (!day) return null;
    const readableDay = editable ? Object.keys(newRoutineData)[idx]  : idx ? `Day ${idx + 1}`: DateFormat(new Date(day.date), "yyyy-mm-dd");
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
                            {Object.keys([...new Array(userMeal.quantity)]).map((key) => {
                                return <MealItem meal={meal} key={key}/>
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
            {!!editable && <div className="edit-day" onClick={() => editDayMeals(day)}>Edit Meals</div>}
            {!!editable && <div className="edit-day" onClick={() => editDayWorkout(day)}>Edit Workout</div>}
        </div>
    );
};

export default connect(mapStateToProps, null)(RoutineDay);