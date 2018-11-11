import React from "react";
import { connect } from "react-redux";
import { toggleProperty } from "../store";
import data from "../../data";

class Colors extends React.Component {
  onClick = evt => {
    evt.stopPropagation();
    const { toggleProperty, next } = this.props;
    const target = evt.currentTarget;
    toggleProperty("color", target.dataset.value);
    next();
  };

  get renderColors() {
    const { device, model } = this.props;

    return (
      <ul>
        {data
          .find(d => d.value === device.value)
          .models.find(m => m.value === model.value)
          .colors.map(color => (
            <li
              key={color.value}
              data-value={color.value}
              onClickCapture={this.onClick}
            >
              <span>{color.value}</span>
            </li>
          ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="page-colors">
        <h1 className="page-title">Hvilken farver er din telefon?</h1>
        {this.renderColors}
      </div>
    );
  }
}

export default connect(
  state => ({
    device: state.properties.find(p => p.name === "device"),
    model: state.properties.find(p => p.name === "model")
  }),
  { toggleProperty }
)(Colors);
