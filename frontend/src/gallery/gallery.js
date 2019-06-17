import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./gallery.css"
import { connect } from "react-redux"
import ViewGallery from "../viewGallery/viewGallery"

class UnconnectedGallery extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.renderImages = this.renderImages.bind(this)
  }
  componentDidMount() {
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
    }
  }

  renderImages() {
    let allImages = this.props.images
    let groupedImages = []

    if (this.props.images) {
      allImages.map(group => {
        let rand = Math.floor(Math.random() * group.paths.length)
        groupedImages.push({ id: group._id, path: group.paths[rand] })
      })

      let columns = [0, 1, 2, 3]
      return (
        <div className="row">
          {columns.map((column, index) => {
            let len = groupedImages.length
            let end = len / 4

            function getImagesInColumn(
              allImages,
              columnIndex,
              numOfImagesInColumn
            ) {
              const startIndex = columnIndex * numOfImagesInColumn
              const endIndex = startIndex + numOfImagesInColumn

              return allImages.slice(startIndex, endIndex)
            }
            let test = getImagesInColumn(groupedImages, index, end)
            return (
              <div key={column} className="column">
                {test.map(item => {
                  let rand = Math.floor(Math.random() * (500 - 100) + 100)
                  return (
                    <Link to={"/images/" + item.id} key={item.id}>
                      <img
                        key={item.id}
                        src={
                          "http://" +
                          window.location.hostname +
                          ":80" +
                          item.path
                        }
                        style={{ height: rand + "px" }}
                      />
                    </Link>
                  )
                })}
              </div>
            )
          })}
        </div>
      )
    }
  }

  render() {
    return <div className="cont">{this.renderImages()}</div>
  }
}
let Gallery = connect(st => {
  console.log("state in connect: ", st)
  return { images: st.images }
})(UnconnectedGallery)
export default Gallery
