import React, {Component} from 'react';
import RoutineDay from "./RoutineDay";
import DatePicker from "react-date-picker"
import "../../scss/routines/ExistingRoutine.scss";
import {fetchRoutineByStartDate} from "../../util/RoutineApiUtil";
import EditDay from "../days/EditDay";

class ExistingRoutine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            dateError: "Select Start Date",
            selectedDay: null,
            editable: false
        }
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleDaySelect = this.handleDaySelect.bind(this);
    }
    componentDidMount() {
        this.props.fetchRoutine(this.props.routine._id);
    }
    handleDaySelect(day){
        this.setState({selectedDay: day});
    }
    handleStartDate(date){
        this.setState({ startDate: date }, () => {
          fetchRoutineByStartDate(this.state.startDate).then(res => {
            let dateError = null;
            if (res.data.datesFound){
              dateError = "Routine already found for that week.";
            } else {
                const {days, userMeals, workouts} = this.props;
                this.props.receiveNewRoutineStartDateWithData(date, {days, userMeals, workouts});
            }
            this.setState({
                dateError
            })
          }).catch(err => console.log(err));
        });
    }

    handleEditSubmit(){

    }

    constructNewRoutine(){

    }

    render() {
        const {days, userMeals, meals, workouts, exercises, submitableRoutine} = this.props;
        const {dateError, selectedDay, editable} = this.state;
        if (!!selectedDay) {
            const dayUserMeals = selectedDay.meals.map(mealId => userMeals[mealId]);
            return (
                <EditDay day={selectedDay} userMeals={dayUserMeals} meals={meals} workout={workouts[selectedDay.workout]} exercises={workouts[selectedDay.workout].exercises.map(eId => exercises[eId])}/>
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
                            {dateError}
                        </div>
                        <div className={`submit ${dateError ? 'disabled' : ""}`} onClick={() => this.props.submitRoutine(submitableRoutine)}>Create Routine</div>
                    </div>
                }
                {days.map((d, idx)=> {
                    return (
                        <div key={d._id}>
                            <RoutineDay idx={idx} day={d} modal={true} editDay={this.handleDaySelect} editable={editable}/>
                        </div>
                    )
                })}
                {editable && <div className="submit">Confirm Routine</div>}
            </div>
        );
    }
}

export default ExistingRoutine;