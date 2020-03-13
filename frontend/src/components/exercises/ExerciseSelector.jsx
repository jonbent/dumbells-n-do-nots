import React, {Component} from 'react';
import MuscleGroupSelectorContainer from '../musclegroups/MuscleGroupSelectorContainer';
import '../../scss/bodyUI/ExerciseSelector.scss'
import OptionCarouselHolder from "../slider/OptionCarouselHolder";
export default class ExerciseSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleExerciseSelect = this.handleExerciseSelect.bind(this);
        this.handleSetDate = this.handleSetDate.bind(this);


    }
    handleExerciseSelect(exerciseId){
        this.props.receiveRoutineExercise({day: this.props.day, exerciseId})
    }
    handleSetDate(val){
        this.props.receiveDaySelected(val)
    }
    render() {
        const {muscleGroups, selectedExercises, days, day, selectedMuscleGroupIds, exercises, exerciseDays = [], closeSelector, curRoutine, editing } = this.props;

        // separate exercises by muscle group
        const allExercises = {};
        selectedMuscleGroupIds.forEach(id => allExercises[id] = []);
        if (selectedMuscleGroupIds.length)
            Object.values(exercises).forEach(e => {
            if (allExercises[e.muscleGroup]) allExercises[e.muscleGroup].push(e)
        });
        const muscleGroupKeys = Object.keys(muscleGroups);
        return (
            <div className="exercise-selector-container">
                <MuscleGroupSelectorContainer selectedMuscleGroupIds={selectedMuscleGroupIds}/>
                {!editing && <div className="day-select">
                    <h1>Select Day</h1>
                    <div className="scheduled-days">
                        {!editing && days.map((date) => (
                            <div key={date} className={ day === date ? "selected" : ""} onClick={e => this.handleSetDate(date)}>{date}</div>
                        ))}
                        {!!editing && (
                            <div className="selected">{day}</div>
                        )}
                    </div>
                    {/*<select value={day} onChange={e => this.handleSetDate(e.currentTarget.value)}>*/}
                    {/*    {days.map((date, idx) => <option key={date} value={date}>{date}</option>)}*/}
                    {/*</select>*/}
                </div>}
                {muscleGroupKeys.length && selectedMuscleGroupIds.length !== 0 && <div className="group-exercises-container">
                        {selectedMuscleGroupIds.map(groupId => {
                            return (
                                <div className="group-exercise-list" key={groupId}>
                                    <OptionCarouselHolder items={allExercises[groupId]} header={muscleGroups[groupId].name} onClick={this.handleExerciseSelect} selectedItems={selectedExercises}/>
                                </div>
                            )
                        })}
                    </div>
                }
                <div className="submit">
                    <div onClick={() => !editing ? this.props.submitRoutine(curRoutine) : closeSelector()}>
                        {!editing ? "Submit Week's Workouts" : "Confirm Exercises"}
                    </div>
                </div>
            </div>
        )
    }
}