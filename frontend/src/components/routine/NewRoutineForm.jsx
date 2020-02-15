import React from 'react';
// import {Link} from 'react-router-dom';
import DayPickerInput from "react-day-picker/DayPickerInput";
import YearMonthForm from '../signup/year_month_form';
import DateFormat from 'dateformat'
import "react-day-picker/lib/style.css";
import "../../scss/newRoutineForm.scss"
import {fetchRoutineByStartDate} from "../../util/RoutineApiUtil";

const currentYear = new Date().getFullYear();
const toMonth = new Date(currentYear, 0);
const fromMonth = new Date(currentYear - 80)


class NewRoutineForm extends React.Component {
  constructor(props) {
    super(props);
    const currentDate = new Date();

    const weekFromCurrentDate = currentDate.setDate(currentDate.getDate() + 7);
    this.state = {
      month: currentDate,
      startDate: currentDate,
      endDate: DateFormat(weekFromCurrentDate, "yyyy-mm-dd"),
      dateError: "Select A date"
    };
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleYearMonthChange = this.handleYearMonthChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handleStartDate(e) {
    this.setState({ startDate: DateFormat(e, "yyyy-mm-dd") }, () => {
      fetchRoutineByStartDate(this.state.startDate).then(res => {
        let dateError = null;
        if (res.data.datesFound){
          dateError = "Routine already found for that week.";
        }
        this.setState({
            dateError
        })
      });
    });
  }
  handleYearMonthChange(month) {
    this.setState({ month });
  }
  handleNext(e) {
    if (this.state.dateError) return null;
    e.preventDefault();
    this.props.receiveNewRoutineStartDate(this.state.startDate);
    this.props.openAddMealsFormModal();
  }

  render() {
    // const startDate = this.state.startDate;
    const {dateError, month, startDate} = this.state;
    const dayPickerProps = {
      month,
      fromMonth: fromMonth,
      toMonth: toMonth,
      captionElement: ({ date, localeUtils }) => (
        <YearMonthForm
          date={date}
          localeUtils={localeUtils}
          onChange={this.handleYearMonthChange}
        />
      )
    };
    return (
      <form className="new-routine-form">
        <h1 className="new-routine-header">New Routine</h1>

        <div className="start-date-input">
          <label className="start-date-label">Select Start Date
            <DayPickerInput
              dayPickerProps={dayPickerProps}
              onDayChange={e => this.handleStartDate(e)}
              selectedDays={startDate}
            />
          </label>
        </div>
        <div className="date-error">
            {dateError}
          </div>
        <button className={`next-button ${dateError ? "disabled" : ""}`} onClick={this.handleNext}>
            <div>Next</div>
        </button>
      </form>
    );
  }
}

export default NewRoutineForm;