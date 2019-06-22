import React, { Component } from "react"
import Galleries from "./viewAllGalleries"
import Profile from "./profile"
import { connect } from "react-redux"
import AddImages from "../addImages/addImages"
import "./admin.css"
import AddCloth from "./addCloth"
import AddSalon from "./addSalon"
import AddBaradi from "./addBaradi"
class UnconnectedAdminPage extends Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }
  handleLogout(event) {
    event.preventDefault()
    this.props.dispatch({
      type: "set-sessionId",
      actionData: {
        sessionId: ""
      }
    })
  }
  render() {
    if (this.props.sid) {
      return (
        <div className="admin-content">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active" data-toggle="tab" href="#profile">
                Profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#Galleries">
                View Galleries
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#addImages">
                Add produits finaux
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#addCloth">
                Add Tissu
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#addSalon">
                Add Bois
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#addBaradi">
                Add Rideaux
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                onClick={this.handleLogout}
              >
                Log Out
              </a>
            </li>
          </ul>
          <div id="myTabContent" className="tab-content">
            <div className="tab-pane fade active show" id="profile">
              <Profile />
            </div>
            <div className="tab-pane fade " id="Galleries">
              <Galleries />
            </div>

            <div className="tab-pane fade" id="addImages">
              <AddImages />
            </div>
            <div className="tab-pane fade" id="addCloth">
              <AddCloth />
            </div>
            <div className="tab-pane fade" id="addSalon">
              <AddSalon />
            </div>
            <div className="tab-pane fade" id="addBaradi">
              <AddBaradi />
            </div>
          </div>
          {/* <span>
            <button className="btn btn-dark" >
              log out
            </button>
          </span> */}
        </div>
      )
    } else {
      return <h1 className="log-in-warning">Please log in! </h1>
    }
  }
}

let AdminPage = connect(st => {
  return {
    sid: st.stateSid
  }
})(UnconnectedAdminPage)
export default AdminPage
