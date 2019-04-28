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
    fetch("http://localhost:4000/updateData", {
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
        <form onSubmit={this.submitChangePassword}>
          <input
            type="text"
            onChange={this.handleOldPassChange}
            placeholder="Old password"
            value={this.state.oldPass}
          />
          <br />
          <input
            type="text"
            onChange={this.handleNewPassChange}
            placeholder="new password"
            value={this.state.newPass}
          />
          <br />
          <input type="submit" className="" value="Save" />
        </form>
      </div>
    )
  }
}

export default Profile
