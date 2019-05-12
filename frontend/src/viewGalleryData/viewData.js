import React, { Component } from "react"
import { connect } from "react-redux"
import Lightbox from "react-images"
// import { Link } from "react-router-dom"
import "./viewData.css"
import { FacebookShareButton, FacebookIcon } from "react-share"

class UnconnectecViewData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: ""
    }
    this.renderImages = this.renderImages.bind(this)
    this.previewImg = this.previewImg.bind(this)
    this.renderFbShare = this.renderFbShare.bind(this)
  }
  componentDidMount() {
    console.log("images: ", this.props.images)
    console.log("id: ", this.props.match.params.id)
    let arrImages = []
    let idToGet = this.props.match.params.id
    fetch("http://localhost:4000/api/getImagesGallery", {
      method: "POST",
      body: JSON.stringify(idToGet)
    })
      .then(response => {
        return response.text()
      })
      .then(response => {
        let parsedResponse = JSON.parse(response)
        console.log("parsed: ", parsedResponse)
        arrImages = parsedResponse[0].paths
        console.log("arr images: ", arrImages)
        if (!this.state.images) {
          this.setState({ images: parsedResponse[0].paths })
        }
      })

    // let item = arrImages.filter(item => item._id === idToGet)
    // console.log("paths: ", item)
  }

  previewImg(event) {
    console.log(event.target.tagName)
    let src = ""
    if (event.target.tagName.toUpperCase() == "IMG") {
      src = event.target.src
      console.log("src: ", src)
      let img = document.getElementById("previewImg")
      img.src = src
    }
  }
  renderFbShare() {
    console.log("stateSID: ", this.props.stateSid)
    let url =
      "http://" +
      window.location.hostname +
      ":4000/images/" +
      this.props.match.params.id
    let title = "View Gallery"
    console.log("url: ", url)
    if (this.props.stateSid) {
      return (
        <FacebookShareButton url={url} quote={title}>
          <FacebookIcon size={40} round />
        </FacebookShareButton>
      )
    }
  }

  renderImages() {
    if (this.state.images) {
      console.log("state: ", this.state.images)
      let img = document.getElementById("previewImg")
      img.src =
        "http://" + window.location.hostname + ":4000" + this.state.images[0]

      return this.state.images.map((path, index) => {
        console.log(
          "path in render images: ",
          "http://" + window.location.hostname + ":4000" + path
        )
        return (
          <img
            className="thumb"
            src={"http://" + window.location.hostname + ":4000" + path}
            key={index}
            onClick={this.previewImg}
          />
        )
      })
    }
  }

  render() {
    console.log("stateSID: ", this.props.stateSid)

    return (
      <div className="cont-prev">
        <div className="preview">{this.renderImages()}</div>
        <div>
          <img id="previewImg" className="previewImg" />
        </div>
        <div>{this.renderFbShare()}</div>
      </div>
    )
  }
}
let ViewData = connect(st => {
  console.log("state in connect: ", st)
  return { images: st.images, stateSid: st.stateSid }
})(UnconnectecViewData)
export default ViewData
