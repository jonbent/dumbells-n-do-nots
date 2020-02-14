import React, {Component} from 'react';
import RoutineDay from "./RoutineDay";
import '../../scss/routines/RoutineShow.scss'
import RoutinePage from "./RoutinePage";
import DateFormat from 'dateformat'
class RoutineShow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            curDay: 0,
        };
        this.changeDay = this.changeDay.bind(this);
    }

    changeDay(num){
        this.setState({
            curDay: num
        })
    }
    render() {
        const {days} = this.props;
        const {curDay} = this.state;
        if (!days) return null;
        const dayValues = Object.values(days);
        return (
            <div className="RoutineShow">
                {!dayValues && <div className="not-found">
                    Current Routine not found.
                </div>}
                {!!dayValues && <div className="routine-day-container">
                    <RoutineDay day={dayValues[curDay]}/>
                </div>}
                {!!dayValues && <div className="pagination-container">
                    <RoutinePage curDay={curDay} dayAmount={dayValues.length} dayValues={dayValues.map(el => DateFormat(el.date, "yyyy-mm-dd"))} changeDay={this.changeDay}/>
                </div>}
            </div>
        );
    }
}

export default RoutineShow;