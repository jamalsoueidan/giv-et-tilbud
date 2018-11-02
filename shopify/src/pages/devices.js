import React from "react";
import { connect } from "react-redux";
import { toggleProperty } from "../store";
import data from "../data";

class Devices extends React.Component {
  onClick = evt => {
    evt.stopPropagation();
    const { toggleProperty, next } = this.props;
    const target = evt.currentTarget;
    toggleProperty("device", target.dataset.value);
    next();
  };

  render() {
    return (
      <div>
        <h1>Vælge din telefon</h1>
        <ul id="devices">
          {data.map(device => (
            <li
              key={device.value}
              data-value={device.value}
              onClickCapture={this.onClick}
            >
              <img alt="" src={device.image} />
              <span>{device.value}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(
  null,
  { toggleProperty }
)(Devices);
