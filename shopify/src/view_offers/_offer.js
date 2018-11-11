import React from "react";
import "./_offer.sass";

class Offer extends React.Component {
  render() {
    const offer = this.props.data;

    const properties = offer.properties.reduce((properties, property) => {
      properties[property.name] = property.value;
      return properties;
    }, {});

    return (
      <article className="offer">
        <figure className="product-list-item-thumbnail">
          <a href="/products/beer-print">
            <img
              src="//cdn.shopify.com/s/files/1/0434/2781/products/doublenaut_bottled_600x600.png?v=1397249726"
              alt="Beer Print"
              className="product-list-item-image"
            />
          </a>
        </figure>

        <div className="product-list-item-details">
          <h1 className="product-list-item-title">
            <a href="/products/beer-print">{offer.workshop.name}</a>
            <p>{offer.workshop.address}</p>
            <p>
              {offer.workshop.zip} {offer.workshop.city}
            </p>
          </h1>

          <p className="property">
            <span className="name">Pris</span>
            <span className="value">{properties.price} DK</span>
          </p>
          <p className="property">
            <span className="name">Afstand</span>
            <span className="value">{offer.distance}</span>
          </p>
          <p className="property">
            <span className="name">Tid</span>
            <span className="value">{offer.duration}</span>
          </p>
        </div>

        <div className="input-wrapper">
          <button type="submit" className="button">
            Vælg tilbud
          </button>
        </div>
      </article>
    );
  }
}

export default Offer;
