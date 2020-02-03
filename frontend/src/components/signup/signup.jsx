import React from 'react';
import DateFormat from 'dateformat';
import NavBar from '../navbar/NavBar';
import DayPickerInput from "react-day-picker/DayPickerInput";
import YearMonthForm from './year_month_form'
import {Link} from 'react-router-dom'
import "react-day-picker/lib/style.css";
import '../../scss/LoginForm.scss';
import '../../scss/signup.scss';

const currentYear = new Date().getFullYear();
const toMonth = new Date(currentYear, 0);
const fromMonth = new Date(currentYear-80)

class Signup extends React.Component {
  constructor(props) {
    super(props);
    const currentDate = new Date();
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      birthDate: '',
      sex: "",
      weightStart: "",
      goalPath: "",
      height1: "",
      height2: "",
      month: currentDate
    };

    this.updateField = this.updateField.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBirthDate = this.handleBirthDate.bind(this);
    this.setHeight = this.setHeight.bind(this);
    this.handleYearMonthChange = this.handleYearMonthChange.bind(this);
  }
  setHeight() {
    let feet = this.state.height1;
    let inches = this.state.height2;
    let result = parseInt(feet) * 12 + parseInt(inches);
    return result.toString();
  }
  handleSubmit(e) {
    let final_input = this.state;
    final_input["height"] = this.setHeight();
    this.props.signup(final_input).then((post) => {
      if (typeof post !== 'object') {
        this.props.history.push("/");
      }
    });
  }
  updateField(field, e) {
    this.setState({ [field]: e.currentTarget.value });
  }
  handleNext(e) {
    e.preventDefault();
    this.props.receiveNextStep(2);
  }
  handleBirthDate(e) {
    this.setState({ birthDate: DateFormat(e, "yyyy-mm-dd") });
  }
  handleYearMonthChange(month) {
    this.setState({ month });
  }
  render() {
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
    const { errors } = this.props;
    let usernameErrors;
    let emailErrors;
    let passwordErrors;
    let confimrPasswordErrors;
    let dobErrors;
    let weightErrors;
    let sexErrors;
    let heightErrors
    if (errors) {
      
      if (errors.username) {
        usernameErrors = errors.username.message.slice(5);
      }
      if (errors.height) {
        heightErrors = 'Height is required';
      }
      if (errors.email) {
        emailErrors = errors.email.message
      }
      if (errors.password) {
        passwordErrors = errors.password.message.slice(5);
      }
      if (errors.password2) {
        confimrPasswordErrors = errors.password2.message;
      }
      if (errors.sex) {
        sexErrors = errors.sex.message;
      }
      if (errors.birthDate) {
        dobErrors = errors.birthDate.message.slice(5);
      }
      if (errors.weightStart) {
        weightErrors = errors.weightStart.message;
      }
    }
    let form_type;
    if (this.props.step === 1) {
      form_type = (
        <form>
          <div className="signup-form-header">Sign up</div>
          <div className="signup-form-detail-container">
            <div className="signup-form-input-detail-container">
              <label className="signup-form-detail-label">Username</label>
              <div className="signup-form-detail-input">
                <input
                  type="text"
                  onChange={e => this.updateField("username", e)}
                  value={this.state.username}
                />
              </div>
              <div className="signup-errors">{usernameErrors}</div>
            </div>
            <div className="signup-form-input-detail-container">
              <label className="signup-form-detail-label">Email</label>
              <div className="signup-form-detail-input">
                <input
                  type="text"
                  onChange={e => this.updateField("email", e)}
                  value={this.state.email}
                />
              </div>
              <div className="signup-errors">{emailErrors}</div>
            </div>
            <div className="signup-form-input-detail-container">
              <label className="signup-form-detail-label">Password</label>
              <div className="signup-form-detail-input">
                <input
                  type="password"
                  onChange={e => this.updateField("password", e)}
                  value={this.state.password}
                />
              </div>
              <div className="signup-errors">{passwordErrors}</div>
            </div>
            <div className="signup-form-input-detail-container">
              <label className="signup-form-detail-label">
                Confirm password
              </label>
              <div className="signup-form-detail-input">
                <input
                  type="password"
                  onChange={e => this.updateField("password2", e)}
                  value={this.state.password2}
                />
              </div>
              <div className="signup-errors">{confimrPasswordErrors}</div>
            </div>
          </div>
          <div onClick={this.handleNext} className="signup-form-button">
            Next
          </div>
        </form>
      );
    } else {
      form_type = (
        <form className="signup-form">
          <div className="signup-form-detail-container">
            <div className="signup-form-input-detail-container">
              <div className="signup-form-detail-label">D.O.B</div>
              <div className="signup-form-detail-input">
                <DayPickerInput
                  dayPickerProps={dayPickerProps}
                  onDayChange={e => this.handleBirthDate(e)}
                  selectedDays={this.state.birthDate}
                />
              </div>

              <div className="signup-errors">{dobErrors}</div>
            </div>

            <div className="signup-form-input-detail-container">
              <label className="signup-form-detail-label">Height</label>
              <div className="signup-form-height-input">
                <div className="signup-form-height">
                  <input
                    type="text"
                    onChange={e => this.updateField("height1", e)}
                    value={this.state.height1}
                  />
                  <span>ft</span>
                  <input
                    type="text"
                    onChange={e => this.updateField("height2", e)}
                    value={this.state.height2}
                  />
                  <span>in</span>
                </div>
                <div className="signup-errors">{heightErrors}</div>
              </div>
            </div>
            <div className="signup-form-input-detail-container">
              <div className="signup-form-detail-label">Sex</div>
              <div className="signup-form-detail-dropdown">
                <select
                  className="signup-form-dropdown"
                  defaultValue=""
                  onChange={e => this.updateField("sex", e)}
                >
                  <option value="">-- Select one --</option>
                  <option style={{ textAlign: "center" }} value={"M"}>
                    Male
                  </option>
                  <option value={"F"}>Female</option>
                </select>
              </div>
              <div className="signup-errors">{sexErrors}</div>
            </div>

            <div className="signup-form-input-detail-container">
              <label className="signup-form-detail-label">Weight</label>
              <div className="signup-form-detail-input">
                <input
                  type="input"
                  placeholder="in lbs"
                  onChange={e => this.updateField("weightStart", e)}
                  value={this.state.weightStart}
                />
              </div>
              <div className="signup-errors">{weightErrors}</div>
            </div>

            <div className="signup-form-input-detail-container">
              <label className="signup-form-detail-label">Goal Path</label>
              <div className="signup-form-detail-dropdown">
                <select
                  className="signup-form-dropdown"
                  defaultValue=""
                  onChange={e => this.updateField("goalPath", e)}
                >
                  <option value="">-- Select one --</option>
                  <option value={"loose_weight"}>Loose weight</option>
                  <option value={"gain_weight"}>Gain weight</option>
                </select>
              </div>
            </div>
          </div>
          <div onClick={this.handleSubmit} className="signup-form-button">
            Sign up
          </div>
        </form>
      );
    }
    return (
      <div className="login-page">
        <NavBar />
        <div className="signup-form-container">
          {form_type}
        <div className="separator-container">
            <span className="separator"></span>
            <span>OR</span>
            <span className="separator"></span>
        </div>
          <Link onClick={this.props.resetErrors} to="/login" className="sign-up-link">Login</Link>
        </div>

      </div>
    );
  }
}

export default Signup