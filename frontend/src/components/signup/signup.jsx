import React from 'react';
import DateFormat from 'dateformat'

class Signup extends React.Component {
    constructor(props){
        super(props);
        const currentDate = new Date();
        this.state = {
            email: '',
            password: '',
            confirm_password: '',
            dob: DateFormat(currentDate, 'yyyy-mm-dd'),
            height: '',
            gender: '',
            weight: '',
            goalPath: ''
        }

        this.updateField = this.updateField.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    validateUsername(){}
    validateUsername(){}
    validateUsername(){}
    validateUsername(){}
    handleSubmit(e){
        this.props.signup(this.state);
    }
    updateField(field, e){
        this.setState({[field]: e.currentTarget.value});
    }
    handleNext(e){
        e.preventDefault();
        this.props.receiveNextStep(2);
    }
    render(){
        let form_type;
        if (this.props.step === 1) {
            form_type = (
                <form>
                    <div className="signup-form-header">Sign up</div>
                    <div className="form-detail-container">
                        <div>
                            <div className="signup-form-detail-label">Username</div>
                            <div className="signup-form-detail-input">
                                <input
                                    type="text"
                                    onChange={(e) => this.updateField('username', e)}
                                    value={this.state.username}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="signup-form-detail-label">Email</div>
                            <div className="signup-form-detail-input">
                                <input
                                    type="text"
                                    onChange={(e) => this.updateField('email', e)}
                                    value={this.state.email}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="signup-form-detail-label">Password</div>
                            <div className="signup-form-detail-input">
                                <input
                                    type="text"
                                    onChange={(e) => this.updateField('password', e)}
                                    value={this.state.password}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="signup-form-detail-label">Confirm password</div>
                            <div className="signup-form-detail-input">
                                <input
                                    type="text"
                                    onChange={(e) => this.updateField('confirm_password', e)}
                                    value={this.state.confirm_password}
                                />
                            </div>
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
                <div className="form-detail-container">
                    <div>
                        <div className="signup-form-detail-label">D.O.B</div>
                        <div className="signup-form-detail-input">
                            <input
                                type="date"
                                onChange={(e) => this.updateField('dob', e)}
                                value={this.state.dob}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="signup-form-detail-label">Height</div>
                        <div className="signup-form-detail-input">
                            <input
                                type="text"
                                onChange={(e) => this.updateField('height', e)}
                                value={this.state.height}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="signup-form-detail-label">Gender</div>
                        <div className="signup-form-detail-input">
                            <select className="signup-form-dropdown" defaultValue="" onChange={(e) => this.updateField('gender', e)}>
                                <option value="">-- Select one --</option>
                                <option value={'M'}>Male</option>
                                <option value={'F'}>Female</option>
                            </select>

                        </div>
                    </div>
                    <div>
                        <div className="signup-form-detail-label">Confirm password</div>
                        <div className="signup-form-detail-input">
                            <select className="signup-form-dropdown" defaultValue="" onChange={(e) => this.updateField('goalPath', e)}>
                                <option value="">-- Select one --</option>
                                <option value={'loose_weight'}>Loose weight</option>
                                <option value={'gain_weight'}>Gain weight</option>
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
                <div>Navbar</div>
                <div>
                    {form_type}
                </div>
            </div>
        );
    }
}

export default Signup