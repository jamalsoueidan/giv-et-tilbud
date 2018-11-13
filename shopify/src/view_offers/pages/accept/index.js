import React from "react";
import classnames from "classnames";
import Choose from "./_choose";
import Confirm from "./_confirm";
import Booking from "./_booking";
import { confirmAlert } from "react-confirm-alert";
import history from "../../core/history";
import "./index.sass";

class Accept extends React.Component {
  onAccept = () => {
    confirmAlert({
      title: "Acceptere dette tilbud?",
      message: "Du kan ikke skifte til et andet tilbud.",
      buttons: [
        {
          label: "Ja",
          onClick: () => alert("Click Yes")
        },
        {
          label: "Nej",
          onClick: () => window.history.back()
        }
      ]
    });
  };

  get accepted() {
    const offer = this.props.offer;
    return offer.accepted && !offer.booking_at;
  }

  get booking_done() {
    const offer = this.props.offer;
    return offer.accepted && offer.booking_at;
  }

  get choose() {
    const offer = this.props.offer;
    return !offer.accepted && !offer.booking_at;
  }

  get renderPage() {
    const { offer, order } = this.props;

    if (this.accepted) {
      return <Booking order={order} offer={offer} onBooking={this.onBooking} />;
    } else if (this.booking_done) {
      return <Confirm order={order} offer={offer} onBooking={this.onBooking} />;
    } else {
      return <Choose order={order} offer={offer} onAccept={this.onAccept} />;
    }
  }

  render() {
    const { order, offer } = this.props;

    return (
      <div className="accept">
        <ul className="progress-indicator">
          <li
            className={classnames("progress-indicator-step", {
              "progress-indicator-step-active": this.choose
            })}
          >
            Vælg tilbud
          </li>
          <li
            className={classnames("progress-indicator-step", {
              "progress-indicator-step-active": this.accepted
            })}
          >
            Bestil tid
          </li>
          <li
            className={classnames("progress-indicator-step", {
              "progress-indicator-step-active": this.booking_done
            })}
          >
            Bekræftelse
          </li>
        </ul>
        <div className="content">{this.renderPage}</div>
      </div>
    );
  }
}

export default Accept;
