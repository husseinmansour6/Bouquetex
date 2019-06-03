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
    console.log(this.props.clothsList)
    if (this.props.clothsList === undefined) {
      fetch("http://" + window.location.hostname + ":80/api/getCloths")
        .then(response => {
          return response.text()
        })
        .then(response => {
          let parsedRes = JSON.parse(response)
          console.log("parsed Response: ", parsedRes.cloths)
          this.props.dispatch({
            type: "get-cloths",
            actionData: parsedRes.cloths
          })
          this.setState({ cloths: parsedRes.cloths })
        })
    }
  }

  renderCloths() {
    if (this.props.clothsList !== undefined) {
      return this.props.clothsList.map(cloth => {
        console.log("cloth: ", cloth)
        return (
          <Cloth
            path={cloth.path}
            cost={cloth.costPerMeter}
            type={cloth.typeOfCloth}
            clothId={cloth._id}
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
