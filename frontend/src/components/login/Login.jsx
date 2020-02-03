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
    }

    handleUpdate(field, e){
        this.setState({[field]: e.target.value})
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
          <div className="login-page">
            <NavBar />
            <div className="login-form-container">
              <form onSubmit={this.handleSubmit}>
                <div className="selected-field">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={e => this.handleUpdate("username", e)}
                  />
                </div>
                {usernameError}
                <div className="selected-field">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => this.handleUpdate("password", e)}
                  />
                </div>
                {passwordError}
                <input type="submit" value="Log In" />
              </form>
                <div className="separator-container">
                    <span className="separator"></span>
                    <span>OR</span>
                    <span className="separator"></span>
                </div>
            <Link to="/signup" className="sign-up-link">Sign Up</Link>
            </div>
          </div>
        );
    }
}
