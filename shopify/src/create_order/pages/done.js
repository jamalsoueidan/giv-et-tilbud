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
      datetime,
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
      properties: [device, model, color, issue, datetime]
    });
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
      datetime,
      order
    } = this.props;

    if (!order.id) {
      return <div>Vent et øjeblik, mens din opgave bliver oprettet...</div>;
    }

    return (
      <div className="page-done">
        <h1 className="page-title">Din anmodning er oprettet!</h1>
        <div>
          Vi sender din anmodning videre til alle værksteder i nærheden af dig
          og giver dig det bedste bud du kan få! <br />
          Din order nummer: <strong>{order.id}</strong>
        </div>
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
                {customer.value.address}, {zip.value}, DK
              </div>
            </li>
            <li>
              <div className="name">Hvornår?</div>
              <div className="value">{moment().to(datetime.value)}</div>
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
    const datetime = find("datetime");
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
      datetime,
      zip,
      city,
      address,
      customer,
      order: state.order
    };
  },
  { createOrder }
)(Done);
