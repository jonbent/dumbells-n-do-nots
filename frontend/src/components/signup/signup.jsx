import React from 'react';
import DateFormat from 'dateformat';
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

class Signup extends React.Component {
    constructor(props){
        super(props);
        const currentDate = new Date();
        this.state = {
            email: '',
            password: '',
            confirm_password: '',
            birthDate: DateFormat(currentDate, 'yyyy-mm-dd'),
            height: '',
            gender: '',
            weightStart: '',
            goalPath: ''
        }

        this.updateField = this.updateField.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBirthDate = this.handleBirthDate.bind(this);
        this.toggleDayPicker = this.toggleDayPicker.bind(this);
    }
    validateUsername(){}
    validateUsername(){}
    validateUsername(){}
    validateUsername(){}
    handleSubmit(e){
      e.preventDefault();
        this.props.signup(this.state);
    }
    updateField(field, e){
        this.setState({[field]: e.currentTarget.value});
    }
    handleNext(e){
        e.preventDefault();
        this.props.receiveNextStep(2);
    }
    handleBirthDate(e){
      this.setState({ birthDate: DateFormat(e, 'yyyy-mm-dd')})
    }
    toggleDayPicker(){
      document.getElementById("day-picker").classList.toggle("hide");
    }
    render(){
        const {errors} = this.props;
        let usernameErrors;
        let emailErrors;
        let passwordErrors;
        let confimrPasswordErrors;
        let dobErrors;
        let weightErrors;
        let genderErrors;
        if(errors){
            if (errors.username) {
              usernameErrors = errors.username;
            }
            if (errors.email) {
              emailErrors = errors.email;
            }
            if (errors.password) {
              passwordErrors = errors.password;
            }
            if (errors.password2) {
              confimrPasswordErrors = errors.password2;
            }
            if (errors.sex) {
              genderErrors = errors.sex;
            }
            if (errors.birthDate) {
              dobErrors = errors.birthDate;
            }
            if (errors.weightStart) {
              weightErrors = errors.weightStart;
            }
        }
        let form_type;
        if (this.props.step === 1) {
            form_type = (
              <form>
                <div className="signup-form-header">Sign up</div>
                <div className="signup-form-detail-container">
                  <div className="signup-form-input-detail-container">
                    <div className="signup-form-detail-label">Username</div>
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
                    <div className="signup-form-detail-label">Email</div>
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
                    <div className="signup-form-detail-label">Password</div>
                    <div className="signup-form-detail-input">
                      <input
                        type="text"
                        onChange={e => this.updateField("password", e)}
                        value={this.state.password}
                      />
                    </div>
                    <div className="signup-errors">{passwordErrors}</div>
                  </div>
                  <div className="signup-form-input-detail-container">
                    <div className="signup-form-detail-label">
                      Confirm password
                    </div>
                    <div className="signup-form-detail-input">
                      <input
                        type="text"
                        onChange={e => this.updateField("confirm_password", e)}
                        value={this.state.confirm_password}
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
              <form>
                <div className="signup-form-detail-container">
                  <div className="signup-form-input-detail-container">
                    <div className="signup-form-detail-label">D.O.B</div>
                    <div className="signup-form-detail-dropdown">
                      {/* <input
                        type="date"
                        onChange={e => this.updateField("birthDate", e)}
                        value={this.state.birthDate}
                      />*/}
                      <input
                        onClick={this.toggleDayPicker}
                        type="text"
                        value={this.state.birthDate}
                      />
                    </div> 
                      <DayPicker
                        id="day-picker"
                        className="hide"
                        onDayClick={e => this.handleBirthDate(e)}
                        selectedDays={this.state.birthDate}
                      />

                    <div className="signup-errors">{dobErrors}</div>
                  </div>

                  <div className="signup-form-input-detail-container">
                    <div className="signup-form-detail-label">Height</div>
                    <div className="signup-form-detail-input">
                      <input
                        type="text"
                        onChange={e => this.updateField("height", e)}
                        value={this.state.height}
                      />
                    </div>
                  </div>
                  <div className="signup-form-input-detail-container">
                    <div className="signup-form-detail-label">Sex</div>
                    <div className="signup-form-detail-dropdown">
                      <select
                        className="signup-form-dropdown"
                        defaultValue=""
                        onChange={e => this.updateField("gender", e)}
                      >
                        <option value="">-- Select one --</option>
                        <option value={"M"}>Male</option>
                        <option value={"F"}>Female</option>
                      </select>
                    </div>
                    <div className="signup-errors">{genderErrors}</div>
                  </div>

                  <div className="signup-form-input-detail-container">
                    <div className="signup-form-detail-label">Weight</div>
                    <div className="signup-form-detail-input">
                      <input
                        type="input"
                        onChange={e => this.updateField("weightStart", e)}
                        value={this.state.weightStart}
                      />
                    </div>
                    <div className="signup-errors">{weightErrors}</div>
                  </div>

                  <div className="signup-form-input-detail-container">
                    <div className="signup-form-detail-label">Goal Path</div>
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
            <div>
                <div className="auth-navbar">Dumbells N Do-nots</div>
                <div className="signup-form-container">
                    {form_type}
                </div>
            </div>
        );
    }
}

export default Signup