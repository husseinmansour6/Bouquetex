// import ReactDOM from "react-dom"
import "./home.css"
// import { BrowserRouter, Route } from "react-router-dom"
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import baradi from "../../public/imgs/baradi.jpg"
import salon from "../../public/imgs/salon.jpg"
import cloth from "../../public/imgs/cloth.jpg"

class UnconnectedHome extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.renderImages = this.renderImages.bind(this)
  }
  componentDidMount() {
    // if (this.props.images.length === 0) {
    if (this.props.images === [] || this.props.images === undefined) {
      fetch("http://" + window.location.hostname + ":80/api/getImages")
        .then(response => {
          return response.text()
        })
        .then(response => {
          let parsedResponse = JSON.parse(response)
          this.props.dispatch({
            type: "all-images",
            actionData: parsedResponse
          })
        })
    } else {
    }
  }
  renderImages() {
    let allImages = []

    if (this.props.images) {
      this.props.images.map(item => {
        item.paths.map(path => {
          allImages.push(path)
        })
      })
      let num = [0, 1, 2, 3]

      return num.map(n => {
        let rand = Math.floor(Math.random() * allImages.length)
        return (
          <img
            className=""
            key={rand}
            src={"http://" + window.location.hostname + ":80" + allImages[rand]}
          />
        )
      })
    }
  }
  render() {
    return (
      <div>
        <div className="images-transition">
          <div id="cf">{this.renderImages()}</div>
        </div>
        <div className="services">
          <div className="services-info">
            <div className="test">
              <Link to="/service-one">
                <img className="s-info-img" src={cloth} />
                <span className="alt-text">Cloth</span>
              </Link>
            </div>
            <div className="test">
              <Link to="/service-two">
                <img className="s-info-img" src={salon} />
                <span className="alt-text">Salon</span>
              </Link>
            </div>
            <div className="test">
              <Link to="service-three">
                <img className="s-info-img" src={baradi} />
                <span className="alt-text">Baradi</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

let Home = connect(st => {
  return { images: st.images }
})(UnconnectedHome)
export default Home
