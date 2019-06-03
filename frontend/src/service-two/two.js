import React, { Component } from "react"
import { connect } from "react-redux"
import Salon from "../salon/salon"

class UnconnectedTwo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      salons: []
    }
    this.renderSalons = this.renderSalons.bind(this)
  }
  componentDidMount() {
    console.log(this.props.salonsList)
    if (this.props.salonsList === undefined && this.state.salons.length === 0) {
      fetch("http://" + window.location.hostname + ":80/api/getSalons")
        .then(response => {
          return response.text()
        })
        .then(response => {
          let parsedRes = JSON.parse(response)
          console.log("parsed Response: ", parsedRes.salons)
          this.props.dispatch({
            type: "get-salons",
            actionData: parsedRes.salons
          })
          this.setState({ salons: parsedRes.salons })
        })
    }
  }

  renderSalons() {
    if (this.props.salonsList !== undefined) {
      return this.props.salonsList.map(salon => {
        console.log("salon: ", salon)
        return (
          <Salon
            path={salon.path}
            cost={salon.costPerMeter}
            salonId={salon._id}
          />
        )
      })
    }
  }
  render() {
    return <div className="service-content-page">{this.renderSalons()}</div>
  }
}

let Two = connect(st => {
  console.log("states in two: ", st.salons)
  return { salonsList: st.salons }
})(UnconnectedTwo)
export default Two
