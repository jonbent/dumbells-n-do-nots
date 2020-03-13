import React, {Component} from 'react';
import RoutineDay from "./RoutineDay";
import DatePicker from "react-date-picker"
import "../../scss/routines/ExistingRoutine.scss";
import EditWorkout from "../days/EditWorkout";
import EditMeals from "../days/EditMeals";
import dateFormat from 'dateformat'

class ExistingRoutine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            selectedWorkoutDay: null,
            selectedMealsDay: null,
            editable: localStorage.getItem('routineEdit') ? true : false
        };

        this.constructNewRoutine = this.constructNewRoutine.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleDayWorkoutSelect = this.handleDayWorkoutSelect.bind(this);
        this.handleDayMealsSelect = this.handleDayMealsSelect.bind(this);
        this.closeSelector = this.closeSelector.bind(this);
        this.callback = this.callback.bind(this);
    }
    componentDidMount() {
        let setDate = new Date(this.props.daySelected);
        if (this.props.daySelected) {
            this.setState({
                startDate: setDate
            }, () => {
                this.props.fetchRoutine(this.props.routineId).then(() => this.handleStartDate(this.state.startDate));
            })
        } else {
            this.props.fetchRoutine(this.props.routineId).then(() => this.handleStartDate(new Date(this.props.days[0].date)));
        }

    }
    handleDayWorkoutSelect(day, idx){
        this.props.receiveDaySelected(this.props.dayKeys[idx]);
        this.setState({selectedWorkoutDay: day});
    }
    handleDayMealsSelect(day, idx){
        this.props.receiveDaySelected(this.props.dayKeys[idx]);
        this.setState({selectedMealsDay: day});
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
    closeSelector(){
        if (this.state.selectedWorkoutDay) this.props.submitEdit(this.state.selectedWorkoutDay, this.props.submitableRoutine[this.props.daySelected]);
        if (this.state.selectedMealsDay) this.props.submitEdit(this.state.selectedMealsDay, this.props.submitableRoutine[this.props.daySelected]);
        this.setState({
            selectedWorkoutDay: null,
            selectedMealsDay: null
        })
    }
    constructNewRoutine(){
        if (this.props.routineError.message || !this.props.daySelected) return null;
        return this.props.submitRoutine(this.props.submitableRoutine).then(() => {
            return this.setState({editable: true})
        })
    }

    render() {
        const {days, userMeals, daySelected, routineError, closeModal} = this.props;
        const curDate = new Date();
        curDate.setHours(0,0,0,0);
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
            const dayUserMeals = selectedMealsDay.meals.map(mealId => userMeals[mealId]);
            return (
                <EditMeals
                    userMeals={dayUserMeals}
                    closeSelector={this.closeSelector}
                />
            );
        }
        let shouldAllowEdit = false;
        const firstDay = new Date(days[0].date);
        firstDay.setHours(0,0,0,0);
        if (curDate.getTime() <= firstDay.getTime()) shouldAllowEdit = true;
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

                        <div className={`submit ${routineError.message || !daySelected ? 'disabled' : ""}`}
                             onClick={this.constructNewRoutine}>
                            Create Routine
                        </div>
                        {shouldAllowEdit && <div className='or-container'>
                            <div></div>
                            <div>OR</div>
                            <div></div>
                        </div>}
                        {shouldAllowEdit && <div className="edit-routine-container">
                                <div className="edit-routine" onClick={() => this.setState({editable: true})}>
                                    Edit Routine
                                </div>
                                <div>{dateFormat(days[0].date, 'mm/dd/yyyy')} - {dateFormat(days[6].date, 'mm/dd/yyyy')}</div>
                            </div>}
                    </div>
                }
                {days.map((d, idx)=> {
                    return (
                        <div key={d._id}>
                            <RoutineDay
                                history={true}
                                idx={idx}
                                day={d}
                                modal={true}
                                editDayWorkout={(day) => this.handleDayWorkoutSelect(day, idx)}
                                editDayMeals={(day) => this.handleDayMealsSelect(day, idx)}
                                editable={editable}/>
                        </div>
                    )
                })}
                {editable && <div className="submit" onClick={closeModal}>Confirm Routine</div>}
            </div>
        );
    }
}

export default ExistingRoutine;