import ReactDOM from "react-dom"
import "./main.css"
import { BrowserRouter, Route } from "react-router-dom"
import React, { Component } from "react"
import Nav from "./navbar/nav"
import ContactUs from "./contactUs/contactUs"
import AboutUs from "./about-us/about-us"
import Home from "./home/home"
import Three from "./service-three/three"
import Two from "./service-two/two"
import One from "./service-one/one"
import { Link } from "react-router-dom"
import Login from "./login/login"
import { Provider } from "react-redux"
import { createStore } from "redux"
import ViewGallery from "./gallery/gallery"
import Gallery from "./gallery/gallery"
import ViewData from "./viewGalleryData/viewData"
import addImages from "./addImages/addImages"
import AdminPage from "./admin/adminPage"

function reducer(state, action) {
  switch (action.type) {
    case "set-sessionId":
      console.log("action: ", action)
      return {
        ...state,
        stateSid: action.actionData.sessionId
      }
    case "new-images":
      console.log("action: ", action)
      return {
        ...state,
        images: state.images.concat(action.actionData)
      }
    case "add-cloth":
      console.log("action: ", action)
      return {
        ...state,
        cloths: state.cloths.concat(action.actionData)
      }
    case "add-salon":
      console.log("action: ", action)
      return {
        ...state,
        salons: state.salons.concat(action.actionData)
      }
    case "add-baradi":
      console.log("action: ", action)
      return {
        ...state,
        baradi: state.baradi.concat(action.actionData)
      }
    case "all-images":
      console.log("action: ", action)
      return {
        ...state,
        images: action.actionData
      }
    case "get-cloths":
      console.log("action: ", action)
      return {
        ...state,
        cloths: action.actionData
      }
    case "get-baradi":
      console.log("action: ", action)
      return {
        ...state,
        baradi: action.actionData
      }
    case "get-salons":
      console.log("action: ", action)
      return {
        ...state,
        salons: action.actionData
      }
    case "del-cloth":
      console.log("action: ", action)
      let newClothsList = state.cloths.filter(cloth => {
        return cloth._id !== action.actionData.id
      })
      console.log("new cloths: ", newClothsList)
      return {
        ...state,
        cloths: newClothsList
      }
    case "del-salon":
      console.log("action: ", action)
      let newSalonsList = state.salons.filter(salon => {
        return salon._id !== action.actionData.id
      })
      console.log("new salons: ", newSalonsList)
      return {
        ...state,
        salons: newSalonsList
      }
    case "del-baradi":
      console.log("action: ", action)
      let newBaradiList = state.baradi.filter(baradi => {
        return baradi._id !== action.actionData.id
      })
      console.log("new salons: ", newBaradiList)
      return {
        ...state,
        baradi: newBaradiList
      }
    case "del-gallery":
      console.log("action in del gallery: ", action)
      console.log("images: ", state.images)
      let newImagesList = state.images.filter(img => {
        console.log("img data: ", img._id, "   ", action.actionData.id)
        // if (img._id === action.id) console.log("true")
        return img._id !== action.actionData.id
      })
      console.log("new Images List: ", newImagesList)

      return {
        ...state,
        images: newImagesList
      }
    default:
      return state
  }
}
let myStore = createStore(
  reducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Provider store={myStore}>
        <BrowserRouter>
          <div>
            <div className="header">
              <div className="logo-text">Bouquetex</div>
              <div className="desc-text">Salon Marocain</div>
              <Nav />
            </div>
            <div className="content">
              <Route exact path="/about-us" component={AboutUs} />
              <Route exact path="/service-one" component={One} />
              <Route exact path="/service-two" component={Two} />
              <Route exact path="/service-three" component={Three} />
              <Route exact path="/contact-us" component={ContactUs} />
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/gallery" component={Gallery} />
              <Route exact path="/images/:id" component={ViewData} />
              <Route exact path="/addImages" component={addImages} />
              <Route exact path="/adminPage" component={AdminPage} />
            </div>
            <div className="footer" align="bottom">
              <div className="flex-footer" align="centre">
                <h4 className="spacing">email</h4>
                <h4 className="spacing">
                  <a
                    href="https://www.facebook.com/bouquetex.bouquetex"
                    target="_black"
                  >
                    <img src={
                    "http://" + window.location.hostname + ":80/imgs/fb.png"
                  } className="fb" />
                  </a>
                  Bouquetex
                </h4>
                <h4 className="spacing">(514) 298-3346</h4>
                <h4 className="spacing">
                  <Link className="admin-link" to="/login">
                    Admin
                  </Link>
                </h4>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
