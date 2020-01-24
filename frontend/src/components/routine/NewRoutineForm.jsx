import React from 'react';
import {Link} from 'react-router-dom';


class NewRoutineForm extends React.Component{

    render(){
        return(
            <div className="new-routine-form">
                <h1 className="new-routine-header">New Routine</h1>
                <div className="add-workout-Link">
                    <Link to="/workouts">Add Workouts</Link>
                </div>
                <div className="add-meals-Link">
                    <Link to="/meals">Add Meals</Link>
                </div>
                <div className="choose-sample-routines">
                    <Link to="/routines/sample">Choose Sample Routines</Link>
                </div>
                <div className="routine-date-period">
                <p>From {this.props.routine.startDate}</p>
                <p>To {this.props.routine.endDate}</p>
                </div>
            </div>
        )
    }

}

export default NewRoutineForm;