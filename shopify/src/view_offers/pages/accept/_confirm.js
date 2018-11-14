import React from "react";
import moment from "moment";
import "./_confirm.sass";

class Confirm extends React.Component {
  get renderTextBooking() {
    const offer = this.props.offer;
    if (offer.booking_status === "phone") {
      return (
        <React.Fragment>
          Vi håber du bliver glad for din reparation. Husk at give bedømmelse
          til din enhedsreparation.
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          Værkstedet vil hurtigst muligt give dig svar på din ønskede
          værkstedstid på e-mail eller telefon.
        </React.Fragment>
      );
    }
  }

  get renderDate() {
    const offer = this.props.offer;
    if (offer.booking_status === "phone") {
      return <React.Fragment>I har aftalt indbyrdes</React.Fragment>;
    } else {
      return (
        <React.Fragment>
          {moment(offer.booking_at).format("Do MMMM YYYY, H:mm:ss")}
        </React.Fragment>
      );
    }
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
      <div className="confirm">
        <div className="confirm-body">
          <div className="confirm-info">
            <div className="confirm-info-device">
              {orderProperties.device} {orderProperties.model},{" "}
              {orderProperties.color}
            </div>
            <div className="confirm-info-issue">{orderProperties.issue}</div>
            <div className="confirm-info-created_at">
              {moment(order.created_at).format("Do MMMM YYYY, H:mm:ss")}
            </div>
          </div>
          <h4>Tak for din forespørgsel</h4>
          <p>{this.renderTextBooking}</p>

          <div className="confirm-datetime">
            <strong>Din ønskede dato og tid</strong>
            <p>{this.renderDate}</p>
          </div>

          <div className="confirm-company">
            {workshop.name}
            <br />
            {workshop.address}
            <br />
            {workshop.zip} {workshop.city}
            <br />
            Tlf. {workshop.phone}
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Confirm;
