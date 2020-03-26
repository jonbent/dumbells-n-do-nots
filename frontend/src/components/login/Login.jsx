import React, { Component } from 'react'
import NavBar from '../navbar/NavBar'
import {Link} from 'react-router-dom'
import '../../scss/LoginForm.scss'

export default class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             username: "",
             password: "",
             errors: this.props.errors
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleDemoLogin = this.handleDemoLogin.bind(this)
    }

    componentWillUnmount(){
      this.props.resetErrors()
    }

    handleUpdate(field, e){
        this.setState({[field]: e.target.value})
    }

    handleDemoLogin(){
      this.setState({username: "DemoUser", password: "Password1"})
      setTimeout(() => this.props.login(this.state), 500)
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.login(this.state)
    }
    render() {
        const {username, password} = this.state;
        let usernameError;
        let passwordError;
        if(this.props.errors){
            if(this.props.errors.username){
                usernameError=this.props.errors.username;
            }
            if(this.props.errors.password){
                passwordError=this.props.errors.password;
            }
        }
        return (
            <div className="login-page-container">
                <NavBar />
                <div className="login-page">
                    <div style={{backgroundImage: "url(/images/signup-pic.jpeg)"}} className="signup-pic"></div>
                    <div className="login-form-container">
                        <form>
                            <h3>Login</h3>
                            <div className="selected-field">
                                <label htmlFor="username">Username</label>
                                <div>
                                    <input
                                        type="text"
                                        id="username"
                                        value={username}
                                        onChange={e => this.handleUpdate("username", e)}
                                    />
                                </div>
                                {usernameError && <div className={'login-error'}>{usernameError}</div>}
                            </div>
                            <div className="selected-field">
                                <label htmlFor="password">Password</label>
                                <div>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        autoComplete="current-password"
                                        onChange={e => this.handleUpdate("password", e)}
                                    />
                                </div>
                                {passwordError && <div className={'login-error'}>{passwordError}</div>}
                            </div>
                            <div className="login-button-container"><div className="login-button" onClick={this.handleSubmit}>Log In</div></div>
                        </form>
                        <div className="separator-container">
                            <span className="separator"></span>
                            <span>OR</span>
                            <span className="separator"></span>
                        </div>
                        <div className="demo-login-container">
                            <div className="demo-login" onClick={this.handleDemoLogin}>Demo User</div>
                        </div>
                        <div className="sign-up-link-container">
                            <Link to="/signup" className="sign-up-link">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
