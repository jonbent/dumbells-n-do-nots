import React, { Component } from 'react'
import NavBar from '../navbar/NavBar'

import '../../scss/LoginForm.scss'

export default class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             username: "",
             password: ""
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
        const {username, password, errors} = this.state;
        let usernameError;
        let passwordError;
        if(errors){
            if(errors.username){
                usernameError=errors.username;
            }
            if(errors.password){
                passwordError=errors.password;
            }
        }
        return (
            <div className="login-page">
                <NavBar/>
                <div className="login-form-container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="selected-field">
                            <label htmlFor="username">Username
                            </label>
                            <input type="text" id="username" value={username} onChange={e => this.handleUpdate("username", e)}/>
                            {usernameError}
                        </div>
                        <div className="selected-field">
                            <label htmlFor="password">Password
                            </label>
                            <input type="password" id="password" value={password} onChange={e => this.handleUpdate("password", e)}/>
                            {passwordError}
                        </div>
                        <input type="submit" value="Log In"/>
                    </form>
                </div>
            </div>
        )
    }
}
