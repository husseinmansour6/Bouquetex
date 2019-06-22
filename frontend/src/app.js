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
import fb from "../public/imgs/fb.png"

function reducer(state, action) {
  switch (action.type) {
    case "set-sessionId":
      return {
        ...state,
        stateSid: action.actionData.sessionId
      }
    case "new-images":
      return {
        ...state,
        images: state.images.concat(action.actionData)
      }
    case "add-cloth":
      return {
        ...state,
        cloths: state.cloths.concat(action.actionData)
      }
    case "add-salon":
      return {
        ...state,
        salons: state.salons.concat(action.actionData)
      }
    case "add-baradi":
      return {
        ...state,
        baradi: state.baradi.concat(action.actionData)
      }
    case "all-images":
      return {
        ...state,
        images: action.actionData
      }
    case "get-cloths":
      return {
        ...state,
        cloths: action.actionData
      }
    case "get-baradi":
      return {
        ...state,
        baradi: action.actionData
      }
    case "get-salons":
      return {
        ...state,
        salons: action.actionData
      }
    case "del-cloth":
      let newClothsList = state.cloths.filter(cloth => {
        return cloth._id !== action.actionData.id
      })
      return {
        ...state,
        cloths: newClothsList
      }
    case "del-salon":
      let newSalonsList = state.salons.filter(salon => {
        return salon._id !== action.actionData.id
      })
      return {
        ...state,
        salons: newSalonsList
      }
    case "del-baradi":
      let newBaradiList = state.baradi.filter(baradi => {
        return baradi._id !== action.actionData.id
      })
      return {
        ...state,
        baradi: newBaradiList
      }
    case "del-gallery":
      let newImagesList = state.images.filter(img => {
        return img._id !== action.actionData.id
      })

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
          <React.Fragment>
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
                <h4 className="spacing">hammudi_33@hotmail.com</h4>
                <h4 className="spacing">
                  <a
                    href="https://www.facebook.com/bouquetex.bouquetex"
                    target="_black"
                  >
                    <img src={fb} className="fb" />
                  </a>
                  Bouquetex
                </h4>
                <h4 className="spacing">(514) 298-3346 / (514) 243-6415</h4>
                <h4 className="spacing">
                  <Link className="admin-link" to="/login">
                    Admin
                  </Link>
                </h4>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
