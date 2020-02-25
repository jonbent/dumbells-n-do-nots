import React, {Component} from 'react';
import RoutineDay from "./RoutineDay";
import '../../scss/routines/RoutineShow.scss'
import RoutinePage from "./RoutinePage";
import DateFormat from 'dateformat'
class RoutineShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curDay: props.curDayIdx,
        };
        this.changeDay = this.changeDay.bind(this);
    }
    componentDidMount() {
        this.changeDay(this.props.curDayIdx)
    }

    changeDay(num){
        this.setState({
            curDay: num
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.curDayIdx !== this.props.curDayIdx) this.changeDay(this.props.curDayIdx)
    }

    render() {
        const {days} = this.props;
        const {curDay} = this.state;
        if (!days) return null;
        const dayValues = Object.values(days);
        return (
            <div className="RoutineShow">
                {dayValues.length === 0 && <div className="not-found">
                    <div className="title">Current Routine not found.</div>
                    <div className="create"><div onClick={this.props.openNewRoutineModal}>Create New Routine</div></div>
                </div>}
                {!!dayValues.length && <div className="routine-day-container">
                    <RoutineDay day={dayValues[curDay]} />
                </div>}
                {!!dayValues.length && <div className="pagination-container">
                    <RoutinePage curDay={curDay} dayAmount={dayValues.length} dayValues={dayValues.map(el => DateFormat(el.date, "yyyy-mm-dd"))} changeDay={this.changeDay}/>
                </div>}
            </div>
        );
    }
}

export default RoutineShow;