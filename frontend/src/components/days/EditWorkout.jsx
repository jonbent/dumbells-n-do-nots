import React, {Component} from 'react';
import '../../scss/days/EditDay.scss'
import ExerciseSelector from "../exercises/ExerciseSelectorContainer";

class EditWorkout extends Component {
    render() {
        const {closeSelector, single = false, day = null} = this.props;
        return (
            <div className="edit-day-container">
                <ExerciseSelector editing={true} closeSelector={closeSelector} single={single} day={day}/>
            </div>
        );
    }
}

export default EditWorkout;