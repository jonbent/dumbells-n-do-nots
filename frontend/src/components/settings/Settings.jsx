import React, { Component } from 'react';
import BottomNavBar from "../navbar/BottomNavBar";
import "../../scss/settings.scss";


class Settings extends Component {
    constructor(){
        
    }
    render() {
        const {user} = this.props;
        return (
          <div className="settings-page">
            <div className="main-container">
              <div className="image">
                <div
                  style={{ backgroundImage: `url(${user.avatarUrl})` }}
                ></div>
              </div>
              <label>{user.username}</label>
              <div className="user-details">
                <div>
                  <div>Email:</div>
                  <div>{user.email}</div>
                </div>
                <div>
                  <div>D.O.B:</div>
                  <div>{Date(user.birthDate).toString().slice(4,15)}</div>
                  <input type="text"/>
                </div>
                <div>
                  <div>Weight:</div>
                  <div>{user.currWeight}</div>
                </div>
                <div>
                  <div>Height:</div>
                  <div>{user.height}</div>
                </div>
                <div>
                  <div>Sex:</div>
                  <div>{user.sex === "M" ? "Male" : "Female"}</div>
                </div>
              </div>
              <div>
                <div>Save</div>
              </div>
            </div>
            <BottomNavBar user={user} />
          </div>
        );
    }
}

export default Settings;
