import React from "react";
import "./_offer.sass";

class Offer extends React.Component {
  get renderDetails() {
    const offer = this.props.data;

    return (
      <React.Fragment>
        <p>
          <a href="/products/beer-print">{offer.workshop.name}</a>
        </p>
        <p>{offer.workshop.address}</p>
        <p>
          {offer.workshop.zip} {offer.workshop.city}
        </p>
      </React.Fragment>
    );
  }

  render() {
    const offer = this.props.data;

    const properties =
      offer.properties &&
      offer.properties.reduce((properties, property) => {
        properties[property.name] = property.value;
        return properties;
      }, {});

    return (
      <article className="offer">
        <div className="details">{this.renderDetails}</div>
        <div className="properties">
          <div className="property">
            <span className="name">Pris</span>
            <span className="value">{properties.price || 0} DK</span>
          </div>
          <div className="property">
            <span className="name">Afstand</span>
            <span className="value">{offer.distance || 0}</span>
          </div>
          <div className="property">
            <span className="name">Tid</span>
            <span className="value">{offer.duration || 0}</span>
          </div>
        </div>
        <div className="input-wrapper">
          <button
            type="submit"
            className="button"
            onClick={() => this.props.onClick(offer)}
          >
            Vælg tilbud
          </button>
        </div>
      </article>
    );
  }
}

export default Offer;
