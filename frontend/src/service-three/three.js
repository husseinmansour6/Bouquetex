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
    console.log(this.props.baradiList)
    if (this.props.baradiList === undefined && this.state.baradi.length === 0) {
      fetch("http://localhost:4000/getBaradi")
        .then(response => {
          return response.text()
        })
        .then(response => {
          let parsedRes = JSON.parse(response)
          console.log("parsed Response: ", parsedRes.baradi)
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
        console.log("baradi: ", baradi)
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
        style={{
          display: "flex",
          textAlign: "-webkit - center",
          position: "relative",
          flexWrap: "wrap",
          top: 162
        }}
      >
        {this.renderBaradi()}
      </div>
    )
  }
}

let Three = connect(st => {
  console.log("states in two: ", st.baradi)
  return { baradiList: st.baradi }
})(UnconnectedThree)
export default Three
