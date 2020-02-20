import React from 'react';
// import {Link} from 'react-router-dom';
import DatePicker from "react-date-picker";
import DateFormat from 'dateformat'
// import "react-day-picker/lib/style.css";
import "../../scss/newRoutineForm.scss"
import {fetchRoutineByStartDate} from "../../util/RoutineApiUtil";


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
  }

  handleStartDate(date) {
    console.log(date);
    this.setState({ startDate: date }, () => {
      fetchRoutineByStartDate(this.state.startDate).then(res => {
        let dateError = null;
        if (res.data.datesFound){
          dateError = "Routine already found for that week.";
        }
        this.setState({
            dateError
        })
      }).catch(err => console.log(err));
    });
  }
  handleYearMonthChange(month) {
    this.setState({ month });
  }
  handleNext(e) {
    if (this.state.dateError) return null;
    e.preventDefault();
    this.props.receiveNewRoutineStartDate(DateFormat(this.state.startDate, 'yyyy-mm-dd'));
    this.props.openAddMealsFormModal();
  }
  componentDidMount() {
    // document.querySelector('.DayPickerInput > input').setAttribute('readonly', true)
  }

  render() {
    // const startDate = this.state.startDate;
    const {dateError} = this.state;
    // const dayPickerProps = {
    //   fromMonth: fromMonth,
    //   toMonth: toMonth,
    //   captionElement: ({ date, localeUtils }) => (
    //     <YearMonthForm
    //       date={date}
    //       localeUtils={localeUtils}
    //       onChange={this.handleYearMonthChange}
    //       selectedDays={startDate}
    //     />
    //   )
    // };
    return (
      <form className="new-routine-form">
        <h1 className="new-routine-header">New Routine</h1>

        <div className="start-date-input">
          <label className="start-date-label">Select Start Date
            <DatePicker
              // dayPickerProps={dayPickerProps}
              onChange={this.handleStartDate}
              value={this.state.startDate}
              // selectedDays={startDate}
              // keepFocus={false}
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