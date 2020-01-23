import React, { Component } from 'react';

const currentYear = new Date().getFullYear();
const toMonth = new Date(currentYear, 0);
const fromMonth = new Date(currentYear - 80);

class YearMonthForm extends Component {
  
  render() {
    const { date, localeUtils, onChange } = this.props;
    const months = localeUtils.getMonths();

    const years = [];
    for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
      years.push(i);
    }

    const handleChange = function handleChange(e) {
      const { year, month } = e.target.form;
      onChange(new Date(year.value, month.value));
    };
    return (
      <div className="DayPicker-Caption">
        <select name="month" onChange={handleChange} value={date.getMonth()}>
          {months.map((month, i) => (
            <option key={month} value={i}>
              {month}
            </option>
          ))}
        </select>
        <select name="year" onChange={handleChange} value={date.getFullYear()}>
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default YearMonthForm;