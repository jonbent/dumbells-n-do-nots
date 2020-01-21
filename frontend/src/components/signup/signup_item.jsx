import React, { Component } from 'react'

export default class SignupItem extends Component {
    render() {
        const { itemName } = this.props;
        return (
          <div>
            <div className="signup-form-detail-label">Username</div>
            <div className="signup-form-detail-input">
              <input
                type="text"
                onChange={e => this.updateField("username", e)}
                value={this.state.username}
              />
            </div>
          </div>
        );
    }
}
