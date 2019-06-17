import React, { Component } from "react"
import "./login.css"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value.toLowerCase() })
  }
  handleUsernameChange(event) {
    this.setState({ username: event.target.value.toLowerCase() })
  }
  handleSubmit(event) {
    event.preventDefault()

    let requestedBody = this.state
    fetch("http://" + window.location.hostname + ":80/api/login", {
      method: "POST",
      body: JSON.stringify(requestedBody)
    })
      .then(resBody => {
        return resBody.text()
      })
      .then(resBody => {
        let parsedResponse = JSON.parse(resBody)
        if (!parsedResponse.success) {
          alert(parsedResponse.msg)
        } else {
          this.props.dispatch({
            type: "set-sessionId",
            actionData: {
              sessionId: parsedResponse.sessionId
            }
          })
        }
      })
  }
  render() {
    if (this.props.sessionData) {
      return <Redirect to="/adminPage" />
    } else
      return (
        <div className="login">
          <div className="login-content">
            <h1 className="login-h1">Admin Page</h1>
          </div>
          <div className="login-form">
            <form onSubmit={this.handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Username .."
                  onChange={this.handleUsernameChange}
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="password .."
                  onChange={this.handlePasswordChange}
                />
              </div>
              <div>
                <input type="submit" value="Login" className="submit-btn" />
              </div>
            </form>
          </div>
        </div>
      )
  }
}

let Login = connect(st => {
  return { sessionData: st.stateSid }
})(UnconnectedLogin)
export default Login
