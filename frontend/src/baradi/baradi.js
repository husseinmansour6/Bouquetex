import React, { Component } from "react"
import { connect } from "react-redux"

class UnconnectedBaradi extends Component {
  constructor(props) {
    super(props)
    this.generateDeleteBtn = this.generateDeleteBtn.bind(this)
    this.deleteBaradi = this.deleteBaradi.bind(this)
  }
  deleteBaradi(id) {
    console.log("id: ", id)
    fetch("http://localhost:4000/delBaradi", {
      method: "POST",
      body: JSON.stringify(id)
    })
    this.props.dispatch({
      type: "del-baradi",
      actionData: id
    })
  }
  generateDeleteBtn() {
    if (this.props.SID) {
      // console.log("this props: ", this.props)
      return (
        <img
          className="text"
          src="/images/del.png"
          onClick={() => {
            this.deleteBaradi({ id: this.props.baradiId })
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
          <br />
          <br />
          {this.generateDeleteBtn()}
        </div>
      </div>
    )
  }
}
let Baradi = connect(st => {
  return { SID: st.stateSid, baradi: st.baradi }
})(UnconnectedBaradi)
export default Baradi
