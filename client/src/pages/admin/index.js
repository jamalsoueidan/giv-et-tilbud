import React from "react";
import { connect } from "react-redux";
import { createRouteNodeSelector } from "redux-router5";
import Default from "./default";
import Orders from "./orders";
import Profile from "./profile";
import RouterHelper from "lib/router_helper";

class Index extends React.Component {
  render() {
    const { route } = this.props;
    const routeObject = RouterHelper.getRoute(route.name);

    if (routeObject.name === "profile") {
      return <Profile />;
    } else if (routeObject.name === "orders") {
      return <Orders />;
    }

    return <Default />;
  }
}

export default connect(state => ({
  user: state.user,
  ...createRouteNodeSelector("admin")(state)
}))(Index);
