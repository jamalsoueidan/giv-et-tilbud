import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import data from "../../data";
import { createOrder } from "../store";

class Done extends React.Component {
  componentDidMount() {
    const {
      customer,
      zip,
      device,
      model,
      color,
      issue,
      address,
      city,
      createOrder
    } = this.props;

    createOrder({
      customer: {
        ...customer.value,
        address: address.value,
        city: city.value,
        zip: zip.value
      },
      properties: [device, model, color, issue]
    });
  }

  get getUrl() {
    const order = this.props.order;
    const status_url = order.order_status_url;
    return `/pages/status?token=${order.token}&key=${status_url.substring(
      status_url.lastIndexOf("=") + 1
    )}`;
  }

  render() {
    const {
      customer,
      zip,
      device,
      deviceImage,
      model,
      color,
      issue,
      address,
      city,
      order
    } = this.props;

    if (!order.id) {
      return <div>Vent et øjeblik, mens din opgave bliver oprettet...</div>;
    }

    return (
      <div className="page-done">
        <h1 className="page-title">Din forespørgsel er oprettet</h1>
        <p>
          Tak for din forespørgsel, dine tilbud er snart på vej! Brug for hjælp?
          Ring 00 00 00 00 <br />
          Din order nummer:{" "}
          <strong>
            <a href={this.getUrl} target="_blank" rel="noopener noreferrer">
              {order.id}
            </a>
          </strong>
        </p>
        <p>
          Du kan følge status på din forespørgsel her:{" "}
          <a href={this.getUrl} target="_blank" rel="noopener noreferrer">
            Status siden
          </a>
        </p>
        <div className="details">
          <ul>
            <li>
              <img alt="" src={deviceImage.image} />
            </li>
            <li>
              <div className="name">Device</div>
              <div className="value">
                {device.value} {model.value}, {color.value}
              </div>
            </li>
            <li>
              <div className="name">Issue</div>
              <div className="value">{issue.value}</div>
            </li>
            <li>
              <div className="name">Område</div>
              <div className="value">
                {address.value}, {zip.value} {city.value}
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    const find = name => state.properties.find(p => p.name === name);
    const device = find("device");
    const deviceImage = data.find(d => d.value === device.value);
    const model = find("model");
    const color = find("color");
    const issue = find("issue");
    const zip = find("zip");
    const city = find("city");
    const address = find("address");
    const customer = find("customer");

    return {
      device,
      deviceImage,
      model,
      color,
      issue,
      zip,
      city,
      address,
      customer,
      order: state.order
    };
  },
  { createOrder }
)(Done);
