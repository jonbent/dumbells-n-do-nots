import React, {Component} from 'react';
import RoutineDay from "./RoutineDay";
import '../../scss/routines/RoutineShow.scss'
class RoutineShow extends Component {
    render() {
        const {days, routines} = this.props;
        const dayValues = Object.values(days);
        return (
            <div className="RoutineShow">
                {!dayValues && <div className="not-found">
                    Current Routine not found.
                </div>}
                {dayValues && Object.values(days).map(day => {
                    return (
                        <RoutineDay day={day} routine={routines[day.routine]}/>
                    )
                })}
            </div>
        );
    }
}

export default RoutineShow;