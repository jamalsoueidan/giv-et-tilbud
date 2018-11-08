import React from "react";
import { connect } from "react-redux";
import { createRouteNodeSelector } from "redux-router5";

import RouterHelper from "./lib/router_helper";

class Application extends React.Component {
  render() {
    const topLevelRouteName = this.props.route.name.split(".")[0];
    const route = RouterHelper.getRoute(topLevelRouteName);
    const Layout = RouterHelper.getLayout(route.layout);
    const Page = RouterHelper.getPage(route);

    return (
      <Layout route={route}>
        <Page />
      </Layout>
    );
  }
}

export default connect(createRouteNodeSelector(""))(Application);
