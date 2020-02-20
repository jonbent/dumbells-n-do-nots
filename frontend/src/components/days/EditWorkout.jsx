import React, {Component} from 'react';
import '../../scss/days/EditDay.scss'
import ExerciseSelector from "../exercises/ExerciseSelectorContainer";

class EditWorkout extends Component {
    render() {
        const {day, closeSelector} = this.props;
        return (
            <div className="edit-day-container">
                <ExerciseSelector editing={true} closeSelector={closeSelector}/>
            </div>
        );
    }
}

export default EditWorkout;