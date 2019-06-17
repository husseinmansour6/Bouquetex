import React, { Component } from "react"
import { connect } from "react-redux"
class UnconnectedAddCloth extends Component {
  constructor(props) {
    super(props)
    this.fileChangeHandler = this.fileChangeHandler.bind(this)
    this.typeOfClothChangeHandler = this.typeOfClothChangeHandler.bind(this)
    this.costChangeHandler = this.costChangeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.state = {
      selectedFile: undefined, // The file that the user will selected
      typeOfColth: "", // the user can also
      costPerMeter: "", // the user can also
      items: []
    }
  }
  fileChangeHandler(event) {
    let file = event.target.files[0]
    // Store the file in the state so that you can use it in the submit
    this.setState({ selectedFile: file })
  }
  typeOfClothChangeHandler(event) {
    this.setState({ typeOfColth: event.target.value })
  }
  costChangeHandler(event) {
    this.setState({ costPerMeter: event.target.value })
  }
  submitHandler(event) {
    event.preventDefault()

    let formData = new FormData()
    // product-image matches the string in the backend (can you find it?)
    formData.append("product-image", this.state.selectedFile)
    // The description will be in the req.body of the backend
    formData.append("typeOfCloth", this.state.typeOfColth)
    formData.append("costPerMeter", this.state.costPerMeter)

    fetch("http://" + window.location.hostname + ":80/api/addCloth", {
      body: formData,
      method: "POST"
    })
      .then(responseHeader => {
        return responseHeader.text()
      })
      .then(responseBody => {
        let parsed = JSON.parse(responseBody)
        if (parsed.length !== 0) {
          alert("Saved Successfully !!")
          this.setState({ costPerMeter: "", typeOfColth: "" })
          this.props.dispatch({
            type: "add-cloth",
            actionData: parsed
          })
        }
      })
  }
  render() {
    return (
      <React.Fragment>
        <h1>Add Cloth</h1>
        <form>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Uplode Image</label>
            <div className="col-sm-2">
              <input
                type="file"
                className="form-control-file"
                onChange={this.fileChangeHandler}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Type Of Cloth</label>
            <div className="col-sm-2">
              <input
                type="text"
                className="form-control"
                onChange={this.typeOfClothChangeHandler}
                value={this.state.typeOfColth}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Cost per Meter</label>
            <div className="col-sm-1">
              <input
                type="text"
                className="form-control"
                onChange={this.costChangeHandler}
                value={this.state.costPerMeter}
              />
            </div>
          </div>
          <div>
            <button onClick={this.submitHandler} className="btn btn-dark mb-3">
              Save
            </button>
          </div>
        </form>

        {this.state.items.map(item => {
          let imagePath =
            "http://" + window.location.hostname + ":80" + item.path
          return (
            <div>
              <img src={imagePath} />
              {item.typeOfColth}
              {item.costPerMeter}
            </div>
          )
        })}
      </React.Fragment>
    )
  }
}
let AddCloth = connect()(UnconnectedAddCloth)
export default AddCloth
