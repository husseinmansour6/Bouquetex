import React, { Component } from "react"
import "./cloth.css"
class Cloth extends Component {
  render() {
    return (
      <div className="card bg-dark text-white">
        <img
          src={"http://" + window.location.hostname + ":4000" + this.props.path}
          className="card-img"
          
        />
        <div className="card-img-overlay">
          <h3 className="card-title">{this.props.type}</h3>
          <h5 className="card-text">${this.props.cost}/M</h5>
        </div>
      </div>
    )
  }
}

export default Cloth
