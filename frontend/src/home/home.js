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
    console.log("length: ", this.props.images)
    if (this.props.images === [] || this.props.images === undefined) {
      console.log("empty")
      fetch("http://" + window.location.hostname + ":80/api/getImages")
        .then(response => {
          return response.text()
        })
        .then(response => {
          let parsedResponse = JSON.parse(response)
          console.log("parsed in home: ", parsedResponse)
          this.props.dispatch({
            type: "all-images",
            actionData: parsedResponse
          })
        })
    } else {
      console.log("not empty")
    }
  }
  renderImages() {
    console.log(this.props.images)
    let allImages = []

    if (this.props.images) {
      this.props.images.map(item => {
        // console.log("item: ", item)
        item.paths.map(path => {
          console.log("path: ", path)
          allImages.push(path)
        })
      })
      console.log(allImages.length)
      let num = [0, 1, 2, 3]

      return num.map(n => {
        let rand = Math.floor(Math.random() * allImages.length)
        console.log(rand)
        console.log(allImages[rand])
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
    // console.log("w h n: ", "http://" + window.location.hostname)
    console.log("baradi src: ", baradi)
    return (
      <div>
        <div className="images-transition">
          <div id="cf">{this.renderImages()}</div>
        </div>
        <div className="services">
          <div className="services-info">
            <div className="test">
              <Link to="/service-one">
                <img
                  className="s-info-img"
                  // src={window.location.hostname + "imgs/cloth.jpg/.jpg"}
                  src={cloth}
                />
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
  console.log("state in connect: ", st)
  return { images: st.images }
})(UnconnectedHome)
export default Home
