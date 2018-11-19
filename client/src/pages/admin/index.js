import React from "react";
import { connect } from "react-redux";
import { createRouteNodeSelector } from "redux-router5";
import Default from "./default";
import Orders from "./orders";
import Users from "./users";
import Workshops from "./workshops";
import RouterHelper from "lib/router_helper";

class Index extends React.Component {
  render() {
    const { route } = this.props;
    const routeObject = RouterHelper.getRoute(route.name);

    if (routeObject.name === "users") {
      return <Users />;
    } else if (route.name.indexOf("admin.orders") !== -1) {
      return <Orders />;
    } else if (route.name.indexOf("admin.workshops") !== -1) {
      return <Workshops />;
    }

    return <Default />;
  }
}

export default connect(state => ({
  user: state.user,
  ...createRouteNodeSelector("admin")(state)
}))(Index);
