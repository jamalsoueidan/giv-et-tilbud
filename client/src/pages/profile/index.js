import React from "react";
import { connect } from "react-redux";
import { createRouteNodeSelector } from "redux-router5";
import RouterHelper from "../../lib/router_helper";
import CreateShop from "./create_shop";
import Default from "./default";

class Index extends React.Component {
  render() {
    const { route, user } = this.props;
    const data = RouterHelper.getRoute(route.name);

    const props = {
      route,
      user
    };

    if (data.name === "profile") {
      return <Default {...props} />;
    } else {
      return <CreateShop {...props} />;
    }
  }
}

export default connect(state => ({
  user: state.user,
  ...createRouteNodeSelector("profile")(state)
}))(Index);
