import React, { Component } from 'react'
import NavBar from '../navbar/NavBar'

import '../../scss/LoginForm.scss'

export default class Login extends Component {
    render() {
        return (
            <div className="login-page">
                <NavBar/>
                <div className="login-form-container">
                    <form>
                        <div className="selected-field">
                            <label for="username">Username
                            </label>
                            <input type="text" id="username"/>

                        </div>
                        <div className="selected-field">
                            <label for="password">Password
                            </label>
                            <input type="password" id="password"/>
                        </div>
                        <input type="submit" value="Log In"/>
                    </form>
                </div>
            </div>
        )
    }
}
