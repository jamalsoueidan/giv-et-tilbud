import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import classnames from "classnames";
import { bookingOffer } from "../../store";
import Call from "./booking/_call";
import Date from "./booking/_date";
import "./_booking.sass";

class Booking extends React.Component {
  state = {
    selection: "date"
  };

  changeSelction = selection => {
    this.setState({ selection });
  };

  onBooking = options => {
    const { bookingOffer, offer } = this.props;
    bookingOffer({
      ...options,
      offerId: offer._id
    });
  };

  get renderBody() {
    if (this.state.selection === "call") {
      return <Call onBooking={this.onBooking} offer={this.props.offer} />;
    }
    return <Date onBooking={this.onBooking} offer={this.props.offer} />;
  }

  render() {
    const { order, offer } = this.props;

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
              {moment(order.created_at).format("Do MMMM YYYY, H:mm:ss")}
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
                <button
                  className="link"
                  onClick={evt => {
                    evt.preventDefault();
                    this.changeSelction("call");
                  }}
                >
                  Ring
                </button>
              </li>
              <li
                className={classnames({
                  selected: this.state.selection === "date"
                })}
              >
                <button
                  className="link"
                  onClick={evt => {
                    evt.preventDefault();
                    this.changeSelction("date");
                  }}
                >
                  Book online
                </button>
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
    bookingOffer
  }
)(Booking);
