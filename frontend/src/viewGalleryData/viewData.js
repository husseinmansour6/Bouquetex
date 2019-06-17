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
      images: "",
      title: ""
    }
    this.renderImages = this.renderImages.bind(this)
    this.previewImg = this.previewImg.bind(this)
    this.renderFbShare = this.renderFbShare.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
  }
  componentDidMount() {
    let arrImages = []
    let idToGet = this.props.match.params.id
    fetch("http://" + window.location.hostname + ":80/api/getImagesGallery", {
      method: "POST",
      body: JSON.stringify(idToGet)
    })
      .then(response => {
        return response.text()
      })
      .then(response => {
        let parsedResponse = JSON.parse(response)
        arrImages = parsedResponse[0].paths
        if (!this.state.images) {
          this.setState({ images: parsedResponse[0].paths })
        }
      })
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value })
  }

  previewImg(event) {
    let src = ""
    if (event.target.tagName.toUpperCase() == "IMG") {
      src = event.target.src
      let img = document.getElementById("previewImg")
      img.src = src
    }
  }
  renderFbShare() {
    let url =
      "http://" +
      window.location.hostname +
      ":80/images/" +
      this.props.match.params.id

    let title = this.state.title
    if (title.length === 0) {
      title =
        "New Gallery Added.. Click on the link below to view it. Welcome to Bouquetex :)"
    }

    if (this.props.stateSid) {
      return (
        <div>
          <input
            type="text"
            placeholder="Title"
            onChange={this.handleTitleChange}
          />
          <FacebookShareButton url={url} quote={title}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>
        </div>
      )
    }
  }

  renderImages() {
    if (this.state.images) {
      let img = document.getElementById("previewImg")
      img.src =
        "http://" + window.location.hostname + ":80" + this.state.images[0]

      return this.state.images.map((path, index) => {
        return (
          <img
            className="thumb"
            src={"http://" + window.location.hostname + ":80" + path}
            key={index}
            onClick={this.previewImg}
          />
        )
      })
    }
  }

  render() {
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
  return { images: st.images, stateSid: st.stateSid }
})(UnconnectecViewData)
export default ViewData
