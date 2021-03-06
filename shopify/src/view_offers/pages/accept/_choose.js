import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { acceptOffer } from "../../store";
import { confirmAlert } from "react-confirm-alert";
import history from "../../core/history";
import "./_choose.sass";

class Choose extends React.Component {
  state = {
    disabled: false
  };

  onClick = () => {
    confirmAlert({
      title: "Acceptere dette tilbud?",
      message: "Du kan ikke skifte til et andet tilbud.",
      buttons: [
        {
          label: "Ja",
          onClick: () => {
            this.setState({ disabled: true });
            this.props.acceptOffer(this.props.offer._id);
          }
        },
        {
          label: "Nej"
        }
      ]
    });
  };

  cancel = evt => {
    evt.preventDefault();
    history.push(
      history.jsonToParams({
        ...history.getParams(),
        page: ""
      })
    );
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
              {moment(order.created_at).format("Do MMMM YYYY, H:mm:ss")}
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
              <button
                type="submit"
                className="button"
                onClick={this.onClick}
                disabled={this.state.disabled}
              >
                Acceptér tilbud
              </button>

              <button className="link" onClick={this.cancel}>
                eller annullere
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
