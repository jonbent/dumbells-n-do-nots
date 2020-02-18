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
        const {muscleGroups, selectedExercises, days, day, selectedMuscleGroupIds, exercises, exerciseDays, submitRoutine, curRoutine } = this.props;

        // separate exercises by muscle group
        const allExercises = {};
        selectedMuscleGroupIds.forEach(id => allExercises[id] = []);
        if (selectedMuscleGroupIds.length)
        Object.values(exercises).forEach(e => {
            if (allExercises[e.muscleGroup]) allExercises[e.muscleGroup].push(e)
        });

        return (
            <div className="exercise-selector-container">
                <MuscleGroupSelectorContainer selectedMuscleGroupIds={selectedMuscleGroupIds}/>
                {exerciseDays.length !== 0 && <div className="scheduled-days-container">
                    <div>Scheduled Workouts:</div>
                    <div className="scheduled-days">
                        {exerciseDays.map((date) => (
                            <div key={date} className={ day === date ? "selected" : ""} onClick={e => this.handleSetDate(date)}>{date}</div>
                        ))}
                    </div>
                </div>}
                <div className="day-select">
                    <h1>Select Day</h1>
                    <select value={day} onChange={e => this.handleSetDate(e.currentTarget.value)}>
                        {days.map((date, idx) => <option key={date} value={date}>{date}</option>)}
                    </select>
                </div>
                {selectedMuscleGroupIds.length !== 0 && <div className="group-exercises-container">
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
                    <div onClick={() => submitRoutine(curRoutine)}>
                        Submit Week's Workouts
                    </div>
                </div>
            </div>
        )
    }
}