import React, {Component} from 'react';
import RoutineDay from "./RoutineDay";
import DatePicker from "react-date-picker"
import "../../scss/routines/ExistingRoutine.scss";
import {fetchRoutineByStartDate} from "../../util/RoutineApiUtil";
import EditWorkout from "../days/EditWorkout";
import EditMeals from "../days/EditMeals";

class ExistingRoutine extends Component {
    constructor(props) {
        super(props);
        let setDate = new Date(props.daySelected);
        setDate.setDate(setDate.getDate() + 1);
        this.state = {
            startDate: props.daySelected ? setDate : new Date(),
            selectedWorkoutDay: null,
            selectedMealsDay: null,
            editable: false
        };

        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleDayWorkoutSelect = this.handleDayWorkoutSelect.bind(this);
        this.closeSelector = this.closeSelector.bind(this);
        this.callback = this.callback.bind(this);
    }
    componentDidMount() {
        this.props.fetchRoutine(this.props.routine._id).then(() => this.handleStartDate(new Date()));
    }
    handleDayWorkoutSelect(day, idx){
        this.props.receiveDaySelected(this.props.dayKeys[idx]);
        this.setState({selectedWorkoutDay: day});
    }
    handleStartDate(date){
        this.setState({ startDate: date }, () => {
          return this.props.fetchRoutineByStartDate(this.state.startDate, this.callback)
        });
    }
    callback(date){
        const {days, userMeals, workouts} = this.props;
        this.props.receiveNewRoutineStartDateWithData(date, {days, userMeals, workouts});
    }

    handleEditSubmit(){

    }
    closeSelector(){
        this.setState({
            selectedWorkoutDay: null
        })
    }
    constructNewRoutine(){
        if (this.props.routineError.message || !this.props.daySelected) return null;
        return this.props.submitRoutine(this.props.submitableRoutine).then(() => {
            return this.setState({editable: true})
        })
    }

    render() {

        const {days, userMeals, meals, workouts, exercises, daySelected, routineError, receiveDaySelected, submitableRoutine} = this.props;
        if (!days.length) return null;
        const {selectedWorkoutDay, editable, selectedMealsDay} = this.state;
        if (!!selectedWorkoutDay) {

            return (
                <EditWorkout
                    closeSelector={this.closeSelector}
                />
            );
        }
        if (!!selectedMealsDay){
            const dayUserMeals = selectedWorkoutDay.meals.map(mealId => userMeals[mealId]);
            return (
                <EditMeals
                    userMeals={dayUserMeals}
                    closeSelector={this.closeSelector}
                />
            );
        }
        return (
            <div className="existing-days-container">
                {!editable &&
                    <div>
                        <div className="title">Restart Routine</div>
                         <DatePicker
                          onChange={this.handleStartDate}
                          value={this.state.startDate}
                        />
                        <div className="date-error">
                            {daySelected ? routineError.message : "Select A Day"}
                        </div>
                        <div className={`submit ${routineError.message || !daySelected ? 'disabled' : ""}`} onClick={() => this.constructNewRoutine}>Create Routine</div>
                    </div>
                }
                {days.map((d, idx)=> {
                    return (
                        <div key={d._id}>
                            <RoutineDay
                                idx={idx}
                                day={d}
                                modal={true}
                                editDayWorkout={(day) => this.handleDayWorkoutSelect(day, idx)}
                                editable={editable}/>
                        </div>
                    )
                })}
                {editable && <div className="submit">Confirm Routine</div>}
            </div>
        );
    }
}

export default ExistingRoutine;