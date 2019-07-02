import React, { Component } from "react"
import "./about-us.css"
class AboutUs extends Component {
  render() {
    return (
      <div className="about-us">
        <div className="about-content">
          <h1 className="about-h1">About Us</h1>
        </div>
        <div className="about-text">
          <h5>
            Chers clients, Salamalykom Chez Bouquetex, nous sommes une
            entreprise familiale qui travaille dure pour vous offrir les
            meilleurs salons marocains et rideaux a Montreal a des prix
            imbattables. Nous faisons vos salons marocains de A a Z. Nous avons
            une grande variété de tissus et de bois pour que votre salon
            marocain soit unique et à votre gout. Livraison disponible au Canada
            et aux USA.
          </h5>
          <h5>
            Dear clients, Salamalykom Bouquetex is a small family business where
            we work hard to provide you with the best Moroccan furniture style
            in Montreal at the best prices! Not only do we do curtains but we
            also take care of your “salon marocain” from A to Z. We have a
            variety of cloth and woods for you to choose from so that everything
            is as unique as you wish it to be. Delivery available in Canada and
            the United States.
          </h5>
        </div>
      </div>
    )
  }
}

export default AboutUs
