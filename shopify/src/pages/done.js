import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import data from "../data";

class Done extends React.Component {
  render() {
    const find = name => this.props.properties.find(p => p.name === name);
    const device = find("device");
    const deviceImage = data.find(d => d.value === device.value);
    const model = find("model");
    const color = find("color");
    const issue = find("issue");
    const datetime = find("datetime");
    const zip = find("zip");
    const customer = find("customer");

    return (
      <div className="pageDone">
        <h1>Din anmodning er oprettet!</h1>
        <div>
          Vi sender opgaven videre til alle værksteder i nærheden af dig og
          giver dig det bedste bud du kan få!
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

export default connect(state => ({
  properties: state.properties
}))(Done);
