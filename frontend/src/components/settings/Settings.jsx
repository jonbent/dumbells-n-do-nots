import React, { Component } from 'react';
import BottomNavBar from "../navbar/BottomNavBarContainer";
import "../../scss/settings.scss";
import DateFormat from "dateformat";



class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.user;
    this.currDate = new Date();

    this.update = this.update.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleBirthDate = this.handleBirthDate.bind(this);
  }
  handleSave(e) {
    const formData = new FormData();
    formData.append("email", this.state.email);
    formData.append("weightCur", this.state.weightCur);
    formData.append("height", this.state.height);
    formData.append("birthDate", this.state.birthDate);
    formData.append("sex", this.state.sex);
    formData.append("username", this.state.username);
    formData.append("weightStart", this.state.weightStart);
    console.log(this.state.photoFile);
    
    if (this.state.photoUrl) {
        formData.append("avatarUrl", this.state.photoFile);
    } else {
        formData.append("avatarUrl", this.state.avatarUrl);
    }
    
    this.props.updateUser(formData,this.state.username).then(
    post => this.props.history.push('/'),
    error => {
        this.setState({ errors: error.responseJSON });
    }
    );
    
  }
  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ photoFile: file, photoUrl: fileReader.result });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }
  update(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }
  handleBirthDate(e) {
    this.setState({ birthDate: e.currentTarget.value });
  }

  render() {
      const { user } = this.props;
      let profilePic;
    if (this.state.photoUrl) {
        profilePic = (
          <div style={{ backgroundImage: `url(${this.state.photoUrl})` }}></div>
        );
    }else{
        profilePic = (
          <div style={{ backgroundImage: `url(${user.avatarUrl})` }}></div>
        );
    }
    return (
      <div className="settings-page">
        <div className="main-container">
          <div className="image">
            {profilePic}
            <label htmlFor="edit-profile-picture">Edit</label>
            <input
              id="edit-profile-picture"
              type="file"
              onChange={this.handleFile}
            />
            {/* <div className="new-feed-picture-preview">{preview}</div> */}
          </div>
          <label className="username">{user.username}</label>
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
                type="date"
                value={this.state.birthDate.slice(0, 10)}
                max={DateFormat(this.currDate, "yyyy-mm-dd")}
                onChange={this.handleBirthDate}
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
          <div onClick={this.handleSave} className="save">
            <div>Save</div>
          </div>
        </div>
        <BottomNavBar user={user} />
      </div>
    );
  }
}

export default Settings;
