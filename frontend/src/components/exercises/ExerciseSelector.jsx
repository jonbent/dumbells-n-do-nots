import React, {Component} from 'react';
import MuscleGroupSelectorContainer from '../musclegroups/MuscleGroupSelectorContainer';
import '../../scss/bodyUI/ExerciseSelector.scss'
export default class ExerciseSelector extends Component {
    render() {
        return (
            <div className="exercise-selector-container">
                <MuscleGroupSelectorContainer/>
                <div className='exercise-list'>
                    {this.props.exercises.map((el, idx) => {
                        return (
                            <div key={idx} className='exercise-item'>
                                <div className="name">
                                    {el.name}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}