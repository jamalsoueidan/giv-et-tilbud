import React from "react";

class Devices extends React.Component {
  onClick = evt => {
    const { onData, data } = this.props;
    const target = evt.target;
    const property = { name: "device", value: target.dataset.name };
    data.properties.push(property);
    onData(data, "models");
  };

  render() {
    return (
      <div>
        <h1>Vælge din telefon</h1>
        <ul id="devices">
          <li data-name="iphone" onClick={this.onClick}>
            iphone
          </li>
          <li data-name="samsung" onClick={this.onClick}>
            samsung
          </li>
        </ul>
      </div>
    );
  }
}

export default Devices;
