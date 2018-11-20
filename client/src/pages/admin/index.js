import React from "react";
import { connect } from "react-redux";
import { createRouteNodeSelector } from "redux-router5";
import Default from "./default";
import Orders from "./orders";
import Users from "./users";
import Workshops from "./workshops";

class Index extends React.Component {
  render() {
    const { route } = this.props;

    if (route.name.indexOf("admin.users") !== -1) {
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
