import React from "react";
import { connect } from "react-redux";
import { createRouteNodeSelector } from "redux-router5";
import Default from "./default";
import View from "./view";
import RouterHelper from "lib/router_helper";

class Index extends React.Component {
  render() {
    const { route } = this.props;
    const routeObject = RouterHelper.getRoute(route.name);

    if (routeObject.name === "view") {
      return <View />;
    }

    return <Default />;
  }
}

export default connect(state => ({
  ...createRouteNodeSelector("admin.orders")(state)
}))(Index);
