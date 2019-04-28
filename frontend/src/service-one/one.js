import React, { Component } from "react"
import Cloth from "../cloth/cloth"
import { connect } from "react-redux"

class UnconnectedOne extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cloths: []
    }
    this.renderCloths = this.renderCloths.bind(this)
  }
  componentDidMount() {
    console.log(this.state.cloths.length)
    if (this.state.cloths.length === 0) {
      fetch("http://localhost:4000/getCloths")
        .then(response => {
          return response.text()
        })
        .then(response => {
          let pardesRes = JSON.parse(response)
          console.log("parsed Response: ", pardesRes.cloths)
          this.props.dispatch({
            type: "get-cloths",
            actionData: pardesRes.cloths
          })
          this.setState({ cloths: pardesRes.cloths })
        })
    }
  }

  renderCloths() {
    return this.state.cloths.map(cloth => {
      console.log("cloth: ", cloth)
      return (
        <Cloth
          path={cloth.path}
          cost={cloth.costPerMeter}
          type={cloth.typeOfCloth}
        />
      )
    })
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
        {this.renderCloths()}
      </div>
    )
  }
}

let One = connect(st => {
  console.log("states in one: ", st.cloths)
  return { clothsList: st.cloths }
})(UnconnectedOne)
export default One
