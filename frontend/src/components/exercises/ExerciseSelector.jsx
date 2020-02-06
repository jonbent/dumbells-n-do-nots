import React, {Component} from 'react';
import MuscleGroupSelectorContainer from '../musclegroups/MuscleGroupSelectorContainer';
import '../../scss/bodyUI/ExerciseSelector.scss'
export default class ExerciseSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMuscles: []
        }
    }
    render() {
        return (
            <div className="exercise-selector-container">
                <MuscleGroupSelectorContainer/>
            </div>
        )
    }
}