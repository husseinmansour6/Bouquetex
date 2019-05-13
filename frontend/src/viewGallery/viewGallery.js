import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./viewGallery.css"
class ViewGallery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: ""
    }
    // this.getImages = this.getImages.bind(this)
  }

  render() {
    console.log(
      "id in viewGallery: ",
      this.props.id,
      "paths: ",
      this.props.paths
    )
    let length = this.props.paths.length
    console.log("length of paths: ", length)
    let rand = Math.floor(Math.random() * length)
    let path =
      "http://" + window.location.hostname + ":80" + this.props.paths[rand]

    console.log("path: ", path)
    return (
      <Link to={"/images/" + this.props.id}>
        <img className="itemImg" src={path} />
      </Link>
    )
  }
}

export default ViewGallery
