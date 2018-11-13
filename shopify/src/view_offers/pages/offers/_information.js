import React from "react";
import moment from "moment";
import "./_information.sass";

class Information extends React.Component {
  get status() {
    const order = this.props.data;
    if (order.offers.length === 0) {
      return "Henter tilbud";
    } else if (order.offers.length <= 2) {
      return `${3 - order.offers.length} tilbud mangler`;
    } else {
      return "Færdig";
    }
  }

  render() {
    const order = this.props.data;

    if (!order.line_items) {
      return null;
    }

    const lineItems = order.line_items[0].properties.reduce(
      (properties, property) => {
        properties[property.name] = property.value;
        return properties;
      },
      {}
    );

    return (
      <div className="information">
        <div className="header">
          <div className="order">
            <div className="device">
              {lineItems.device} {lineItems.model}, {lineItems.color}
            </div>
            <div className="issue">{lineItems.issue}</div>
          </div>
          <div className="creation">
            <div className="status">{this.status}</div>
            <div className="date">
              oprettet. {moment(order.created_at).format("D MMM YYYY")}
            </div>
          </div>
        </div>
        <div className="comment">
          <div className="title">Status</div>
          <p>
            {order.offers.length} ud af 3 tilbud hentet. Vi bestræber os på at
            finde dine tilbud inden for 24 timer.
          </p>
        </div>
      </div>
    );
  }
}

export default Information;
