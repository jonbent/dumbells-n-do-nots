import React from 'react';
import {connect} from "react-redux";
import MealItem from "../meals/MealItem";
import DateFormat from 'dateformat'
import { updateRoutine } from '../../actions/RoutineActions'
const mapStateToProps = ({entities}, ownProps) => {
    const workout = Object.values(entities.workouts).find(el => el.day === ownProps.day._id)
    console.log(ownProps.day)
    return {
        meals: entities.routineMeals,
        userMeals: Object.values(entities.userMeals).filter(meal => meal.day === ownProps.day._id),
        workout,
        exercises: workout ? workout.exercises.map(id => entities.exercises[id]) : []
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateRoutine: id => dispatch(updateRoutine(id)),
})

const RoutineDay = ({day, routine, userMeals, meals, exercises, updateRoutine}) => {
    function checkMeal(id) {
        if (userMeals[id].doneAmount === false){
            userMeals[id].doneAmount = true
        } else {
            userMeals[id].doneAmount = false
        }
        updateRoutine(day.routine)
    }
    if (!day) return null;
    const readableDay = DateFormat(new Date(day.date), 'yyyy-mm-dd');
    return (
        <div className="RoutineDay">
            <div className="day-title">
                {readableDay}
            </div>
            <div className="day-meals">
                <div className="meal-title">Meals</div>
                {userMeals.map((userMeal, idx)=> {
                    const meal = meals[userMeal.meal];
                    return (
                        <MealItem meal={meal} key={userMeal._id} handleMealCheck={() => checkMeal(idx)}/>
                    )
                })}
            </div>
            {exercises.length > 0 && <div className="day-workout">
                <div className="workout-title"><span>Workout</span></div>
                {exercises.map((ex, idx) => {
                    return <div key={idx} className="day-exercise">{ex.name}</div>
                })}
            </div>}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutineDay);