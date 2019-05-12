import React, { Component } from "react"

class Profile extends Component {
  constructor(props) {
    super(props)
    this.submitChangePassword = this.submitChangePassword.bind(this)
    this.handleNewPassChange = this.handleNewPassChange.bind(this)
    this.handleOldPassChange = this.handleOldPassChange.bind(this)
    this.state = {
      newPass: "",
      oldPass: ""
    }
  }
  handleNewPassChange(event) {
    this.setState({ newPass: event.target.value })
  }
  handleOldPassChange(event) {
    this.setState({ oldPass: event.target.value })
  }
  submitChangePassword(event) {
    event.preventDefault()
    let oldPass = this.state.oldPass
    let newPass = this.state.newPass
    let bodyToSend = { oldPassword: oldPass, newPassword: newPass }
    fetch("http://localhost:4000/api/updateData", {
      method: "POST",
      body: JSON.stringify(bodyToSend)
    })
      .then(responseHeader => {
        return responseHeader.text()
      })
      .then(responseBody => {
        let parsed = JSON.parse(responseBody)
        console.log("parsed in responce: ", parsed)
        if (parsed.success) {
          alert("Password changed successfully!")
          this.setState({ oldPass: "", newPass: "" })
        } else {
          alert("Wrong password!")
        }
      })
  }
  render() {
    return (
      <div>
        <h1>Change Password </h1>
        <form>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Old Password</label>
            <div className="col-sm-2">
              <input
                type="text"
                className="form-control"
                onChange={this.handleOldPassChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">New Password</label>
            <div className="col-sm-2">
              <input
                type="text"
                className="form-control"
                onChange={this.handleNewPassChange}
              />
            </div>
          </div>

          <div>
            <button
              onClick={this.submitChangePassword}
              className="btn btn-dark mb-3"
            >
              Save
            </button>
          </div>
        </form>
        
      </div>
    )
  }
}

export default Profile
