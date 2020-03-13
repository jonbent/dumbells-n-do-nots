import React from 'react';
import CreateMeal from "../meals/CreateMeal";
import CreateExercise from '../exercises/CreateExercise'

import DatePicker from "react-date-picker";
import DateFormat from 'dateformat'

import "../../scss/newRoutineForm.scss"


class NewRoutineForm extends React.Component {
  constructor(props) {
    super(props);
    const currentDate = new Date();
    const weekFromCurrentDate = new Date().setDate(currentDate.getDate() + 7);;
    this.state = {
      month: currentDate,
      startDate: currentDate,
      endDate: DateFormat(weekFromCurrentDate, "mm/dd/yyyy"),
      dateError: "Select A date",
      creationSelection: 'routine'
    };
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleYearMonthChange = this.handleYearMonthChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.callback = this.callback.bind(this);
    this.handleCreationSelect = this.handleCreationSelect.bind(this);
  }
  handleCreationSelect(select){
    this.setState({
      creationSelection: select
    })
  }
  handleStartDate(date) {
    this.setState({ startDate: date }, () => {
      return this.props.fetchRoutineByStartDate(this.state.startDate, this.callback)
    });
  }
  handleYearMonthChange(month) {
    this.setState({ month });
  }
  callback(){
    this.props.receiveNewRoutineStartDate(DateFormat(this.state.startDate, 'mm/dd/yyyy'));
  }
  handleNext(e) {
    if (this.props.routineError.message) return null;
    e.preventDefault();
    this.props.openAddMealsFormModal();
  }
  componentDidMount() {
    // document.querySelector('.DayPickerInput > input').setAttribute('readonly', true)
    this.handleStartDate(new Date())
  }

  render() {
    const {creationSelection} = this.state;
    const {
      routineError,
      createMeal,
      mealErrors,
      fetchMuscleGroups,
      exerciseErrors,
      createExercise,
      muscleGroups
    } = this.props;

    let content = null;
    switch(creationSelection){
      case 'routine':
        content = (<form className="new-routine-form">
            <h1 className="new-routine-header">New Routine</h1>
            <div className="start-date-input">
              <label className="start-date-label">Select Start Date
                <DatePicker
                  onChange={this.handleStartDate}
                  value={this.state.startDate}
                />
              </label>
            </div>
            <div className="date-error">
              {routineError.message}
            </div>
            <button className={`next-button ${routineError.message ? "disabled" : ""}`} onClick={this.handleNext}>
              <div>Next</div>
            </button>
          </form>)
            break;
      case "meal":
        content = <CreateMeal createMeal={createMeal} mealErrors={mealErrors}/>;
        break;
      case "exercise":
        content = <CreateExercise muscleGroups={muscleGroups} createExercise={createExercise} exerciseErrors={exerciseErrors} fetchMuscleGroups={fetchMuscleGroups}/>
        break;
      default:
        content = null;
        break;
    }
    return (
        <div className="new-creation-container">
          <div className="creation-options">
            <div className={creationSelection === 'routine' ? 'selected' : ''} onClick={() => this.handleCreationSelect("routine")}>Routine</div>
            <div className={creationSelection === 'meal' ? 'selected' : ''} onClick={() => this.handleCreationSelect("meal")}>Meal</div>
            <div className={creationSelection === 'exercise' ? 'selected' : ''} onClick={() => this.handleCreationSelect("exercise")}>Exercise</div>
          </div>
          {content}
        </div>
    );
  }
}

export default NewRoutineForm;