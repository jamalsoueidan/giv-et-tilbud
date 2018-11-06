import React from "react";
import { connect } from "react-redux";
import { createRouteNodeSelector } from "redux-router5";
import RouterHelper from "../../lib/router_helper";
import Send from "./send";
import Default from "./default";

class Index extends React.Component {
  render() {
    const route = this.props.route;
    const data = RouterHelper.getRoute(route.name);

    if (data.name === "incoming") {
      return <Default route={route} />;
    } else {
      return <Send route={route} />;
    }
  }
}

export default connect(state => createRouteNodeSelector("incoming"))(Index);
