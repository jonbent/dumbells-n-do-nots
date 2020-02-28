import React, {Component} from 'react';
import RoutineDay from "./RoutineDay";
import '../../scss/routines/RoutineShow.scss'
import RoutinePage from "./RoutinePage";
import DateFormat from 'dateformat'
import EditWorkout from "../days/EditWorkout";
import EditMeals from "../days/EditMeals";
class RoutineShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curDay: props.curDayIdx,
            selectedWorkoutDay: null,
            selectedMealsDay: null
        };
        this.changeDay = this.changeDay.bind(this);
        this.closeSelector = this.closeSelector.bind(this);
        this.handleDayWorkoutSelect = this.handleDayWorkoutSelect.bind(this);
    }
    componentDidMount() {
        this.changeDay(this.props.curDayIdx)
    }
    closeSelector(){
        this.setState({
            selectedWorkoutDay: null,
            selectedMealsDay: null
        })
    }
    changeDay(num){
        this.setState({
            curDay: num
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.curDayIdx !== this.props.curDayIdx) this.changeDay(this.props.curDayIdx)
    }
    handleDayWorkoutSelect(day, idx){
        // this.props.receiveDaySelected(this.props.dayKeys[idx]);
        this.setState({selectedWorkoutDay: day});
    }
    handleDayMealsSelect(day, idx){
        // this.props.receiveDaySelected(this.props.dayKeys[idx]);
        this.setState({selectedMealsDay: day});
    }
    render() {
        const {days, userMeals, daysHash} = this.props;
        const {curDay, selectedWorkoutDay, selectedMealsDay} = this.state;
        if (!days.length) return null;
        const dayValues = Object.values(days);
        if (!!selectedWorkoutDay) {

            return (
                <EditWorkout
                    closeSelector={this.closeSelector}
                    day={daysHash[selectedWorkoutDay._id]}
                    single={true}
                />
            );
        }
        if (!!selectedMealsDay){
            const dayUserMeals = daysHash[selectedMealsDay._id].meals.map(mealId => userMeals[mealId]);
            return (
                <EditMeals
                    userMeals={dayUserMeals}
                    day={DateFormat(selectedMealsDay.date, "yyyy-mm-dd")}
                    dbDay={daysHash[selectedMealsDay._id]}
                    closeSelector={this.closeSelector}
                    single={true}
                />
            );
        }
        return (
            <div className="RoutineShow">
                {dayValues.length === 0 && <div className="not-found">
                    <div className="title">Current Routine not found.</div>
                    <div className="create"><div onClick={this.props.openNewRoutineModal}>Create New Routine</div></div>
                </div>}
                {!!dayValues.length && <div className="routine-day-container">
                    <RoutineDay
                        day={dayValues[curDay]}
                        editable={this.props.curDayIdx <= curDay}
                        editDayWorkout={(day) => this.handleDayWorkoutSelect(day, curDay)}
                        editDayMeals={(day) => this.handleDayMealsSelect(day, curDay)}
                    />
                </div>}
                {!!dayValues.length && <div className="pagination-container">
                    <RoutinePage curDay={curDay} dayAmount={dayValues.length} dayValues={dayValues.map(el => DateFormat(el.date, "yyyy-mm-dd"))} changeDay={this.changeDay}/>
                </div>}
            </div>
        );
    }
}

export default RoutineShow;