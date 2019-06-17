import React, { Component } from "react"
import { connect } from "react-redux"
import del from "../../public/imgs/del.png"

class UnconnectedBaradi extends Component {
  constructor(props) {
    super(props)
    this.generateDeleteBtn = this.generateDeleteBtn.bind(this)
    this.deleteBaradi = this.deleteBaradi.bind(this)
  }
  deleteBaradi(id) {
    fetch("http://" + window.location.hostname + ":80/api/delBaradi", {
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
      return (
        <img
          className="text"
          src={del}
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
          src={"http://" + window.location.hostname + ":80" + this.props.path}
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
