import React, { Component } from "react"
import "./addImages.css"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import del from "../../public/imgs/del.png"

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
    fetch("http://" + window.location.hostname + ":80/api/delAddedImage", {
      method: "POST",
      body: JSON.stringify(e.path)
    })

    let newState = this.state.items.filter(img => {
      return img !== this.state.items[this.state.items.indexOf(e.path)]
    })

    this.setState({ items: newState })
  }
  submitHandler(event) {
    event.preventDefault()
    if (this.state.selectedFiles.length <= 5) {
      let formData = new FormData()

      for (let i = 0; i < this.state.selectedFiles.length; i++) {
        let file = this.state.selectedFiles[i]
        formData.append("imgs[]", file, file.name)
      }

      fetch("http://" + window.location.hostname + ":80/api/addImages", {
        body: formData,
        method: "POST"
      })
        .then(responseHeader => {
          return responseHeader.text()
        })
        .then(responseBody => {
          let parsed = JSON.parse(responseBody)
          this.setState({ items: parsed.paths })

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
    if (this.props.sessionId) {
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
          </div>

          <div className="img-flex">
            {this.state.items.map(item => {
              let imagePath =
                "http://" + window.location.hostname + ":80" + item
              return (
                <div className="card bg-dark text-white">
                  <div className="card-img-overlay">
                    <img src={imagePath} className="card-img" />
                    <img
                      id="top"
                      className="text"
                      src={del}
                      onClick={() => {
                        this.handelDeleteImage({ path: item })
                      }}
                    />
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
  return { sessionId: st.stateSid }
})(UnconnectedAddImages)
export default AddImages
