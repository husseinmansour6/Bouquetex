import React, { Component } from "react"
import { connect } from "react-redux"

class UnconnectedSalon extends Component {
  constructor(props) {
    super(props)
    this.generateDeleteBtn = this.generateDeleteBtn.bind(this)
    this.deleteSalon = this.deleteSalon.bind(this)
  }
  deleteSalon(id) {
    console.log("id: ", id)
    fetch("http://localhost:4000/api/delSalon", {
      method: "POST",
      body: JSON.stringify(id)
    })
    this.props.dispatch({
      type: "del-salon",
      actionData: id
    })
  }
  generateDeleteBtn() {
    if (this.props.SID) {
      // console.log("this props: ", this.props)
      return (
        <img
          className="text"
          src="/imgs/del.png"
          onClick={() => {
            this.deleteSalon({ id: this.props.salonId })
          }}
        />
      )
    }
  }
  render() {
    return (
      <div className="card bg-dark text-white">
        <img
          src={"http://" + window.location.hostname + ":4000" + this.props.path}
          className="card-img"
        />
        <div className="card-img-overlay">
          <h5 className="card-text">${this.props.cost}/M</h5>
          {this.generateDeleteBtn()}
        </div>
      </div>
    )
  }
}
let Salon = connect(st => {
  return { SID: st.stateSid, salons: st.salons }
})(UnconnectedSalon)
export default Salon
