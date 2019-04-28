import ReactDOM from "react-dom"
import React, { Component } from "react"
// import MapContainer from "./map"
import "./contactUs.css"

class ContactUs extends Component {
  render() {
    return (
      <div className="contact-us-page">
        <div className="info">
          <div className="left">
            <h1 className="info-h1">Contact us</h1>
          </div>
          <div className="right">
            <div className="space">
              <a href="https://bit.ly/2Hpgtej" target="_blank">
                <h4>
                  <img
                    className="contact-us-icons"
                    src="/images/map-marker.png"
                  />
                  3668 Rue Fleury E, Montréal-Nord, QC H1H 2S7
                </h4>
              </a>
            </div>
            <div className="space">
              <h4>
                <img className="contact-us-icons" src="/images/phone.png" />
                (514) 298-3346
              </h4>

              <h4>
                <img src="/images/clock.svg" className="contact-us-icons" />
                Opening Hour:
              </h4>
              <div>
                <h4>Monday: 10:00 - 18:00</h4>
                <h4>Tuesday: 10:00 - 18:00</h4>
                <h4>Wednesday: 10:00 - 18:00</h4>
                <h4>Thursday: 10:00 - 18:00</h4>
                <h4>Friday: 10:00 - 18:00</h4>
                <h4>Saturday: 10:00 - 18:00</h4>
                <h4>Sunday: Closed</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ContactUs
