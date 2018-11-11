import React from "react";
import { connect } from "react-redux";
import { toggleProperty } from "../store";
import data from "../../data";

class Issues extends React.Component {
  onClick = evt => {
    evt.stopPropagation();
    const { toggleProperty, next } = this.props;
    const target = evt.currentTarget;
    toggleProperty("issue", target.dataset.value);
    next();
  };

  get renderColors() {
    const { device, model } = this.props;

    return (
      <ul>
        {data
          .find(d => d.value === device.value)
          .models.find(m => m.value === model.value)
          .issues.map(issue => (
            <li
              key={issue.value}
              data-value={issue.value}
              onClickCapture={this.onClick}
            >
              <span>{issue.value}</span>
            </li>
          ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="page-issues">
        <h1 className="page-title">Hvilken problem har din telefon?</h1>
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
)(Issues);
