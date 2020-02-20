import React from 'react';
// import {Link} from 'react-router-dom';
import DatePicker from "react-date-picker";
import YearMonthForm from '../signup/year_month_form';
import DateFormat from 'dateformat'
// import "react-day-picker/lib/style.css";
import "../../scss/newRoutineForm.scss"
import {fetchRoutineByStartDate} from "../../util/RoutineApiUtil";

const currentYear = new Date().getFullYear();
const toMonth = new Date(currentYear, 0);
const fromMonth = new Date(currentYear - 80)


class NewRoutineForm extends React.Component {
  constructor(props) {
    super(props);
    const currentDate = new Date();
    const weekFromCurrentDate = new Date().setDate(currentDate.getDate() + 7);;
    this.state = {
      month: currentDate,
      startDate: currentDate,
      endDate: DateFormat(weekFromCurrentDate, "yyyy-mm-dd"),
      dateError: "Select A date"
    };
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleYearMonthChange = this.handleYearMonthChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.callback = this.callback.bind(this);
  }

  handleStartDate(date) {
    console.log(date);
    this.setState({ startDate: date }, () => {
      return this.props.fetchRoutineByStartDate(this.state.startDate, this.callback)
    });
  }
  handleYearMonthChange(month) {
    this.setState({ month });
  }
  callback(){
    this.props.receiveNewRoutineStartDate(DateFormat(this.state.startDate, 'yyyy-mm-dd'));
  }
  handleNext(e) {
    if (this.props.routineError.message) return null;
    e.preventDefault();
    this.props.openAddMealsFormModal();
  }
  componentDidMount() {
    // document.querySelector('.DayPickerInput > input').setAttribute('readonly', true)

  }

  render() {
    const {dateError} = this.state;
    const {routineError} = this.props;
    return (
      <form className="new-routine-form">
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
      </form>
    );
  }
}

export default NewRoutineForm;