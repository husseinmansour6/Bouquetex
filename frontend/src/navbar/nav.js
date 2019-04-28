import ReactDOM from "react-dom"
import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./nav.css"
class Nav extends Component {
  render() {
    return (
      <div>
        <ul className="nav-body">
          <li className="nav-bar">
            <Link className="navlink " to="/">
              Home
            </Link>
          </li>
          <li className="nav-bar">
            <Link className="navlink " to="/about-us">
              About Us
            </Link>
          </li>
          <li className="nav-bar">
            <Link className="navlink " to="/contact-us">
              Contact Us
            </Link>
          </li>
          <li className="nav-bar">
            <Link className="navlink " to="/gallery">
              Gallery
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default Nav
