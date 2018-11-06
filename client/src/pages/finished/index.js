import React from "react";
import { connect } from "react-redux";
import { createRouteNodeSelector } from "redux-router5";
import { selectors as OrderSelectors } from "../../store/orders";
import RouterHelper from "../../lib/router_helper";
import Info from "./info";
import Default from "./default";

class Index extends React.Component {
  render() {
    const route = this.props.route;
    const data = RouterHelper.getRoute(route.name);

    if (data.name === "finished") {
      return <Default {...this.props} />;
    } else {
      return <Info route={route} />;
    }
  }
}

export default connect(createRouteNodeSelector("finished"))(Index);
