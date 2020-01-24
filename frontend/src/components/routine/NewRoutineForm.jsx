import React from 'react';
import {Link} from 'react-router-dom';
import DayPickerInput from "react-day-picker/DayPickerInput";
import YearMonthForm from '../signup/year_month_form';
import DateFormat from 'dateformat'
import "react-day-picker/lib/style.css";

const currentYear = new Date().getFullYear();

const toMonth = new Date(currentYear, 0);
const fromMonth = new Date(currentYear - 80)

class NewRoutineForm extends React.Component{
    constructor(props){
        super(props)
        const currentDate = new Date();
        const weekFromCurrentDate = currentDate.setDate(currentDate.getDate() + 7)
        this.state = {
            month: currentDate.getMonth(),
            startDate: DateFormat(currentDate, 'yyyy-mm-dd'),
            endDate: DateFormat(weekFromCurrentDate, 'yyyy-mm-dd')
        }
        this.handleStartDate = this.handleStartDate.bind(this);
    }
    
    handleStartDate(e) {
        this.setState({ startDate: DateFormat(e, "yyyy-mm-dd") });
    }

    render(){
        const dayPickerProps = {
            month: this.state.month,
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
        return(

            <div className="new-routine-form">
                <h1 className="new-routine-header">New Routine</h1>
                <br/>
                <div className="start-date-label">Start Date</div>
                <div className="start-date-input">
                <DayPickerInput
                    dayPickerProps={dayPickerProps}
                    onDayClick={e => this.handleStartDate(e)}
                    selectedDays={this.state.startDate}
                />
                </div>
            </div>
        )
    }

}

export default NewRoutineForm;