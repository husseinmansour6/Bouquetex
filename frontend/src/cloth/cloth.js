import React, { Component } from "react"
import "./cloth.css"
import { connect } from "react-redux"
import del from "../../public/imgs/del.png"

class UnconnectedCloth extends Component {
  constructor(props) {
    super(props)
    this.generateDeleteBtn = this.generateDeleteBtn.bind(this)
    this.deleteCloth = this.deleteCloth.bind(this)
  }
  deleteCloth(id) {
    console.log("id: ", id)
    fetch("http://" + window.location.hostname + ":80/api/delCloth", {
      method: "POST",
      body: JSON.stringify(id)
    })
    this.props.dispatch({
      type: "del-cloth",
      actionData: id
    })
  }
  generateDeleteBtn() {
    if (this.props.SID) {
      // console.log("this props: ", this.props)
      return (
        <img
          className="text"
          src={
            del
          }
          onClick={() => {
            this.deleteCloth({ id: this.props.clothId })
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
          <h3 className="card-title">{this.props.type}</h3>
          <h5 className="card-text">${this.props.cost}/M</h5>
          {this.generateDeleteBtn()}
        </div>
      </div>
    )
  }
}
let Cloth = connect(st => {
  return { SID: st.stateSid, cloths: st.cloths }
})(UnconnectedCloth)
export default Cloth
