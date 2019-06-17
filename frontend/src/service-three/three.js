import React, { Component } from "react"
import { connect } from "react-redux"
import Baradi from "../baradi/baradi";

class UnconnectedThree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      baradi: []
    }
    this.renderBaradi = this.renderBaradi.bind(this)
  }
  componentDidMount() {
    if (this.props.baradiList === undefined && this.state.baradi.length === 0) {
      fetch("http://" + window.location.hostname + ":80/api/getBaradi")
        .then(response => {
          return response.text()
        })
        .then(response => {
          let parsedRes = JSON.parse(response)
          this.props.dispatch({
            type: "get-baradi",
            actionData: parsedRes.baradi
          })
          this.setState({ baradi: parsedRes.baradi })
        })
    }
  }

  renderBaradi() {
    if (this.props.baradiList !== undefined) {
      return this.props.baradiList.map(baradi => {
        return (
          <Baradi
            path={baradi.path}
            cost={baradi.costPerMeter}
            baradiId={baradi._id}
          />
        )
      })
    }
  }
  render() {
    return (
      <div
      className="service-content-page"
       
      >
        {this.renderBaradi()}
      </div>
    )
  }
}

let Three = connect(st => {
  return { baradiList: st.baradi }
})(UnconnectedThree)
export default Three
