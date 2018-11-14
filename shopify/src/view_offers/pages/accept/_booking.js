import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { acceptOffer } from "../../store";
import Call from "./booking/_call";
import Date from "./booking/_date";
import "./_booking.sass";

class Booking extends React.Component {
  state = {
    selection: "date"
  };

  onClick = () => {};

  changeSelction = selection => {
    this.setState({ selection });
  };

  get renderBody() {
    if (this.state.selection === "call") {
      return <Call />;
    }
    return <Date />;
  }

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
      <div className="booking">
        <div className="booking-offer">
          <div className="booking-info">
            <div className="booking-info-device">
              {orderProperties.device} {orderProperties.model},{" "}
              {orderProperties.color}
            </div>
            <div className="booking-info-issue">{orderProperties.issue}</div>
            <div className="booking-info-created_at">
              oprettet 10. november 2018
            </div>
          </div>
          <p>Tilbuddet er accepteret og du skal nu bestille tid.</p>

          <div className="booking-panel">
            <div className="booking-panel-title">{workshop.name}</div>
            <ul>
              <li
                className={classnames({
                  selected: this.state.selection === "call"
                })}
              >
                <a
                  href="#"
                  onClick={evt => {
                    evt.preventDefault();
                    this.changeSelction("call");
                  }}
                >
                  Ring
                </a>
              </li>
              <li
                className={classnames({
                  selected: this.state.selection === "date"
                })}
              >
                <a
                  href="#"
                  onClick={evt => {
                    evt.preventDefault();
                    this.changeSelction("date");
                  }}
                >
                  Book online
                </a>
              </li>
            </ul>
            <div className="booking-panel-body">{this.renderBody}</div>
          </div>
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
)(Booking);
