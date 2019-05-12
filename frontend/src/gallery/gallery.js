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
    // if (this.props.images.length === 0) {
    // console.log("length: ", this.props.images)
    if (this.props.images === [] || this.props.images === undefined) {
      // console.log("empty")
      fetch("http://localhost:4000/api/getImages")
        .then(response => {
          return response.text()
        })
        .then(response => {
          let parsedResponse = JSON.parse(response)
          console.log("parsed in gallery: ", parsedResponse)
          this.props.dispatch({
            type: "all-images",
            actionData: parsedResponse
          })
        })
    }
  }

  renderImages() {
    // console.log("images in render: ", this.props.images)
    let allImages = this.props.images
    let groupedImages = []

    if (this.props.images) {
      allImages.map(group => {
        let rand = Math.floor(Math.random() * group.paths.length)
        // console.log("group: ", group)
        groupedImages.push({ id: group._id, path: group.paths[rand] })
      })
      // console.log("grouped array: ", groupedImages)

      let columns = [0, 1, 2, 3]
      return (
        <div className="row">
          {columns.map((column, index) => {
            let len = groupedImages.length
            let end = len / 4

            // console.log("im in column map")
            console.log("column index: ", index)
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
            console.log("test:  ", test)
            return (
              <div key={column} className="column">
                {test.map(item => {
                  let rand = Math.floor(Math.random() * (500 - 100) + 100)
                  console.log("ids: ", item.id)
                  return (
                    <Link to={"/images/" + item.id} key={item.id}>
                      <img
                        key={item.id}
                        src={
                          "http://" +
                          window.location.hostname +
                          ":4000" +
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
