import React from "react";
import { connect } from "react-redux";

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
      <React.Fragment>
        {page !== "done" && (
          <React.Fragment>
            <ul>{this.renderList}</ul>
            <div id="progressbar" className="progressbar-progress" />
          </React.Fragment>
        )}
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default connect(state => state)(Breadcrumbs);
