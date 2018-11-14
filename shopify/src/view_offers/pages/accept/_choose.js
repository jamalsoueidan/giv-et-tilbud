import React from "react";
import { connect } from "react-redux";
import { acceptOffer } from "../../store";
import { confirmAlert } from "react-confirm-alert";
import "./_choose.sass";

class Choose extends React.Component {
  onClick = () => {
    confirmAlert({
      title: "Acceptere dette tilbud?",
      message: "Du kan ikke skifte til et andet tilbud.",
      buttons: [
        {
          label: "Ja",
          onClick: () => this.props.acceptOffer(this.props.offer._id)
        },
        {
          label: "Nej"
        }
      ]
    });
  };

  render() {
    const { order, offer } = this.props;

    const properties =
      offer.properties &&
      offer.properties.reduce((properties, property) => {
        properties[property.name] = property.value;
        return properties;
      }, {});

    const orderProperties = order.line_items[0].properties.reduce(
      (properties, property) => {
        properties[property.name] = property.value;
        return properties;
      },
      {}
    );

    const workshop = offer.workshop;

    return (
      <div className="choose">
        <div className="choose-offer">
          <div className="choose-info">
            <div className="choose-info-device">
              {orderProperties.device} {orderProperties.model},{" "}
              {orderProperties.color}
            </div>
            <div className="choose-info-issue">{orderProperties.issue}</div>
            <div className="choose-info-created_at">
              oprettet 10. november 2018
            </div>
          </div>
          <p>
            For at sikre dig prisen skal du bekræfte tilbuddet og herefter
            bestille tid.
          </p>
          <div className="choose-accept">
            <div className="choose-accept-company">
              {workshop.name}
              <br />
              {workshop.address}
              <br />
              {workshop.zip} {workshop.city}
              <br />
            </div>
            <div className="choose-accept-price">
              <span className="choose-accept-price-number">
                {properties.price} kr.
              </span>
              <span className="choose-accept-price-cur">Inkl. moms</span>
            </div>
            <div className="choose-accept-button">
              <button type="submit" className="button" onClick={this.onClick}>
                Acceptér tilbud
              </button>
            </div>
          </div>

          <div className="choose-message">
            <strong>{workshop.name} meddelse:</strong>
            <p>{properties.message}</p>
          </div>

          <h5>Vi er din sikkerhed for en tryg handel.</h5>
          <ul>
            <li>
              Betaling sker først på værkstedet, efter at arbejdet er udført og
              godkendt af dig.
            </li>
            <li>Intet ekstraarbejde udføres uden din accept.</li>
            <li>Gratis support, 00 00 00 00</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(
  undefined,
  {
    acceptOffer
  }
)(Choose);
