import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

class UnconnectedGalleries extends Component {
  constructor(props) {
    super(props)

    this.generateTable = this.generateTable.bind(this)
    this.deleteGallery = this.deleteGallery.bind(this)
  }
  componentDidMount() {
    console.log("im in component did mount", this.props.images)

    // console.log("empty")
    fetch("http://localhost:4000/api/getImages")
      .then(response => {
        return response.text()
      })
      .then(response => {
        let parsedResponse = JSON.parse(response)
        console.log("parsed in home: ", parsedResponse)
        this.props.dispatch({
          type: "all-images",
          actionData: parsedResponse
        })
      })
  }
  deleteGallery(id) {
    console.log("gid: ", id)

    fetch("http://localhost:4000/api/delGallery", {
      method: "POST",
      body: JSON.stringify(id)
    })
    this.props.dispatch({
      type: "del-gallery",
      actionData: id
    })
  }
  generateTable() {
    if (this.props.images !== undefined) {
      return this.props.images.map(item => {
        return (
          <tr>
            <td style={{ verticalAlign: "middle" }}>
              <Link to={"/images/" + item._id}>{item._id}</Link>
            </td>
            <td style={{ verticalAlign: "middle" }}>
              {item.paths.map(path => {
                return (
                  <img
                    key={path}
                    src={"http://" + window.location.hostname + ":4000" + path}
                    data-toggle="modal"
                    data-target="#exampleModalScrollable"
                    style={{
                      borderRadius: 50,
                      marginRight: 5,
                      width: 25,
                      height: 25
                    }}
                  />
                )
              })}
            </td>
            <td style={{ verticalAlign: "middle" }}>
              <button
                className="btn btn-danger"
                onClick={() => this.deleteGallery({ id: item._id })}
              >
                X
              </button>
            </td>
          </tr>
        )
      })
    } else return
  }
  render() {
    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Images</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>{this.generateTable()}</tbody>
        </table>
      </div>
    )
  }
}

let Galleries = connect(st => {
  console.log("galleries: ", st.images)
  return { images: st.images }
})(UnconnectedGalleries)
export default Galleries
