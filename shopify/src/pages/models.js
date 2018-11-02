import React from "react";
import { connect } from "react-redux";
import { toggleProperty } from "../store";
import data from "../data";

class Models extends React.Component {
  onClick = evt => {
    evt.stopPropagation();
    const { toggleProperty, next } = this.props;
    const target = evt.currentTarget;
    toggleProperty("model", target.dataset.value);
    next();
  };

  get renderModels() {
    const device = this.props.device;

    return (
      <ul>
        {data.find(d => d.value === device.value).models.map(model => (
          <li
            key={model.value}
            data-value={model.value}
            onClickCapture={this.onClick}
          >
            <img alt="" src={model.image} />
            <span>{model.value}</span>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <h1>Hvilken model har du</h1>
        {this.renderModels}
      </div>
    );
  }
}

export default connect(
  state => ({
    device: state.properties.find(p => p.name === "device")
  }),
  { toggleProperty }
)(Models);
