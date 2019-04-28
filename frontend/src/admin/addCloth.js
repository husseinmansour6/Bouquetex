import React, { Component } from "react"

class AddCloth extends Component {
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

    fetch("http://localhost:4000/addOneImage", {
      body: formData,
      method: "POST"
    })
      .then(responseHeader => {
        return responseHeader.text()
      })
      .then(responseBody => {
        let parsed = JSON.parse(responseBody)
        console.log("parsed : ", parsed)
        // this.setState({ items: parsed })
      })
  }
  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.submitHandler}>
          <h1>Add Cloth</h1>
          <h4>Uplode Image</h4>
          <input type="file" onChange={this.fileChangeHandler} />
          <h4>Type Of Cloth</h4>
          <input type="text" onChange={this.typeOfClothChangeHandler} />
          <h4>Cost per Meter</h4>
          <input type="text" onChange={this.costChangeHandler} />
          <br />
          <input type="submit" />
        </form>

        {this.state.items.map(item => {
          console.log("item data", item)
          // window.location.hostname is the domain (or IP) from where the webpage was downloaded
          let imagePath =
            "http://" + window.location.hostname + ":4000" + item.path
          console.log("image path", imagePath)
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

export default AddCloth
