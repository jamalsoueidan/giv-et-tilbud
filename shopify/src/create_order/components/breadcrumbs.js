import React from "react";
import { connect } from "react-redux";

const progress = [
  "zip",
  "devices",
  "models",
  "colors",
  "issues",
  "booking",
  "details",
  "done"
];

const progressWidth = page => {
  return (progress.indexOf(page) + 1) * (100 / progress.length);
};

class Breadcrumbs extends React.Component {
  get renderList() {
    const properties = this.props.properties;
    return properties
      .filter(p => p.name !== "datetime" && p.name !== "customer")
      .map(property => {
        return <li key={property.name}>{property.value}</li>;
      });
  }
  render() {
    const page = this.props.page;
    return (
      <div className="repair">
        {page !== "done" && (
          <React.Fragment>
            <div
              id="progressbar"
              className="progressbar-progress"
              style={{ width: `${progressWidth(page)}%` }}
            />
          </React.Fragment>
        )}
        {this.props.children}
      </div>
    );
  }
}

export default connect(state => state)(Breadcrumbs);
