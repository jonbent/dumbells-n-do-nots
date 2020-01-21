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
                        <label>Username
                            <input type="text"/>
                        </label>
                        <label>Password
                            <input type="password"/>
                        </label>
                        <input type="submit"/>
                    </form>
                </div>
            </div>
        )
    }
}
