import React, { Component } from "react"
import "./addImages.css"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

class UnconnectedAddImages extends Component {
  constructor(props) {
    super(props)
    this.fileChangeHandler = this.fileChangeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.handelDeleteImage = this.handelDeleteImage.bind(this)

    this.state = {
      selectedFiles: undefined, // The file that the user will selected
      items: []
    }
  }
  fileChangeHandler(event) {
    // Store the file in the state so that you can use it in the submit
    this.setState({ selectedFiles: event.target.files })
  }

  handelDeleteImage(e) {
    console.log("path in delete: ", e)
    fetch("http://localhost:4000/api/delAddedImage", {
      method: "POST",
      body: JSON.stringify(e.path)
    })
    console.log("before: ", this.state.items)
    // this.state.items.splice(, 1)
    // console.log(this.state.items[this.state.items.indexOf(e.path)])
    let newState = this.state.items.filter(img => {
      return img !== this.state.items[this.state.items.indexOf(e.path)]
    })

    console.log("after: ", newState)
    this.setState({ items: newState })
  }
  submitHandler(event) {
    event.preventDefault()
    console.log("length: ")
    if (this.state.selectedFiles.length <= 5) {
      let formData = new FormData()

      for (let i = 0; i < this.state.selectedFiles.length; i++) {
        let file = this.state.selectedFiles[i]
        formData.append("imgs[]", file, file.name)
      }
      console.log("in submit")
      // The description will be in the req.body of the backend
      // console.log("iiiiiiiii: ", this.props.match.params)
      // formData.append("apartmentId", this.props.match.params.id)

      fetch("http://localhost:4000/api/addImages", {
        body: formData,
        method: "POST"
      })
        .then(responseHeader => {
          return responseHeader.text()
        })
        .then(responseBody => {
          console.log("in response 2")
          let parsed = JSON.parse(responseBody)
          console.log("parsed in responce 2: ", parsed)
          console.log("state in responce 2 before : ", this.state.items)
          this.setState({ items: parsed.paths })

          console.log("state in responce 2: ", this.state.items)

          console.log("images in resp: ", this.state.items)
          // this.props.newImages(this.props.actionData.images)
          this.props.dispatch({
            type: "new-images",
            actionData: parsed
          })
        })
    } else {
      alert("Please check the number of images you uploaded!")
    }
  }

  

  render() {
    // console.log("id: ", this.props.match.params)
    console.log("props in add images: ", this.props)

    if (this.props.sessionId) {
      console.log("login")
      return (
        <div className="addImagesPage">
          <div style={{ marginBottom: "10px" }}>
            <h1>Add maximum 5 images </h1>
            <form>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Uplode Images</label>
                <div className="col-sm-2">
                  <input
                    type="file"
                    className="form-control-file"
                    onChange={this.fileChangeHandler}
                    multiple
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={this.submitHandler}
                  className="btn btn-dark mb-3"
                >
                  Save
                </button>
              </div>
            </form>
            {/* <form onSubmit={this.submitHandler} className="add-img-form">
              <input type="file" onChange={this.fileChangeHandler} multiple />
              <br />
              <input type="submit" className="submit-img" />
            </form> */}
          </div>

          <div className="img-flex">
            {this.state.items.map(item => {
              // console.log("item data", item)
              // window.location.hostname is the domain (or IP) from where the webpage was downloaded
              let imagePath =
                "http://" + window.location.hostname + ":4000" + item
              console.log("image path", imagePath)
              return (
                <div className="card bg-dark text-white">
                  <div className="card-img-overlay">
                    <img src={imagePath} className="card-img" />
                    <img
                      id="top"
                      className="text"
                      src="/imgs/del.png"
                      onClick={() => {
                        this.handelDeleteImage({ path: item })
                      }}
                    />
                    {/* {this.generateDeleteBtn()} */}
                    {/* <br />
                    <button
                      onClick={() => {
                        this.handelDeleteImage({ path: item })
                      }}
                    >
                      delete
                    </button> */}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    } else {
      return <Redirect to="login" />
    }
  }
}
let AddImages = connect(st => {
  console.log("sid in st: ", st.stateSid)
  return { sessionId: st.stateSid }
})(UnconnectedAddImages)
export default AddImages
