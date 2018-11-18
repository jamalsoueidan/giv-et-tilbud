import React from "react";
import { connect } from "react-redux";
import { createRouteNodeSelector } from "redux-router5";
import Default from "./default";
import Orders from "./orders";
import Profile from "./profile";
import ViewOrder from "./view_order";
import RouterHelper from "lib/router_helper";

class Index extends React.Component {
  render() {
    const { route } = this.props;
    const routeObject = RouterHelper.getRoute(route.name);

    if (routeObject.name === "users") {
      return <Profile />;
    } else if (routeObject.name === "orders") {
      return <Orders />;
    } else if (route.name === "admin.orders.view") {
      return <ViewOrder />;
    }

    return <Default />;
  }
}

export default connect(state => ({
  user: state.user,
  ...createRouteNodeSelector("admin")(state)
}))(Index);
