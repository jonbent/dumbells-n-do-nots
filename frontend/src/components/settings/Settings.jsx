import React, { Component } from 'react';
import BottomNavBar from "../navbar/BottomNavBarContainer";
import "../../scss/settings.scss";


class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.user;

    this.update = this.update.bind(this);
  }
  update(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }
  render() {
    const { user } = this.props;
    return (
      <div className="settings-page">
        <div className="main-container">
          <div className="image">
            <div style={{ backgroundImage: `url(${user.avatarUrl})` }}></div>
          </div>
          <label>{user.username}</label>
          <div className="user-details">
            <div className="detail-container">
              <div>Email:</div>
              <input
                type="text"
                value={this.state.email}
                onChange={this.update("email")}
              />
            </div>
            <div className="detail-container">
              <div>D.O.B:</div>
              <input
                type="text"
                value={Date(this.state.birthDate)
                  .toString()
                  .slice(4, 15)}
              />
            </div>
            <div className="detail-container">
              <div>Weight:</div>
              <input
                type="text"
                value={this.state.weightCur}
                onChange={this.update("weightCur")}
              />
            </div>
            <div className="detail-container">
              <div>Height:</div>
              <input
                type="text"
                value={this.state.height}
                onChange={this.update("height")}
              />
            </div>
          </div>
          <div className="save">
            <div>Save</div>
          </div>
        </div>
        <BottomNavBar user={user} />
      </div>
    );
  }
}

export default Settings;
