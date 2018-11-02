import React from "react";
import { connect } from "react-redux";

class Breadcrumbs extends React.Component {
  get renderList() {
    const properties = this.props.properties;
    return properties.map(property => {
      return <li key={property.name}>{property.value}</li>;
    });
  }
  render() {
    return (
      <React.Fragment>
        <ul>{this.renderList}</ul>
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default connect(state => state)(Breadcrumbs);
