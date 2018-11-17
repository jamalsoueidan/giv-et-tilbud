import React from "react";
import { connect } from "react-redux";
import { createRouteNodeSelector } from "redux-router5";
import Default from "./default";
import Create from "./create";
import RouterHelper from "lib/router_helper";

class Index extends React.Component {
  render() {
    const { route, user } = this.props;
    const routeObject = RouterHelper.getRoute(route.name);

    if (routeObject.name === "create") {
      return <Create route={route} user={user} />;
    }

    return <Default route={route} user={user} />;
  }
}

export default connect(state => ({
  user: state.user,
  ...createRouteNodeSelector("profile.workshops")(state)
}))(Index);
