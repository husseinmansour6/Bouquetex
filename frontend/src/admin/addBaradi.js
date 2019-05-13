import React, { Component } from "react"
import { connect } from "react-redux"
class UnconnectedAddBaradi extends Component {
  constructor(props) {
    super(props)
    this.fileChangeHandler = this.fileChangeHandler.bind(this)
    this.costChangeHandler = this.costChangeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.state = {
      selectedFile: undefined, // The file that the user will selected
      costPerMeter: "", // the user can also
      items: []
    }
  }
  fileChangeHandler(event) {
    let file = event.target.files[0]
    console.log("file: ", file)

    // Store the file in the state so that you can use it in the submit
    this.setState({ selectedFile: file })
  }

  costChangeHandler(event) {
    console.log("cost: ", event.target.value)
    this.setState({ costPerMeter: event.target.value })
  }
  submitHandler(event) {
    event.preventDefault()
    if (
      this.state.selectedFile === undefined ||
      this.state.costPerMeter === ""
    ) {
      console.log("sf: ", this.selectedFile, " c: ", this.costPerMeter)
      alert("please check your data!")
    } else {
      let formData = new FormData()
      // product-image matches the string in the backend (can you find it?)
      formData.append("product-image", this.state.selectedFile)
      // The description will be in the req.body of the backend
      formData.append("costPerMeter", this.state.costPerMeter)

      fetch("http://localhost:80/api/addBaradi", {
        body: formData,
        method: "POST"
      })
        .then(responseHeader => {
          return responseHeader.text()
        })
        .then(responseBody => {
          let parsed = JSON.parse(responseBody)
          console.log("parsed in add baradi: ", parsed)
          console.log("formdata in add baradi: ", formData)
          if (parsed.length !== 0) {
            alert("Saved Successfully !!")
            this.setState({ costPerMeter: "" })
            this.props.dispatch({
              type: "add-baradi",
              actionData: parsed
            })
          }
        })
    }
  }
  render() {
    return (
      <React.Fragment>
        <h1>Add Baradi</h1>
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
      </React.Fragment>
    )
  }
}
let AddBaradi = connect()(UnconnectedAddBaradi)
export default AddBaradi
