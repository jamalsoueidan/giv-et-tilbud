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

    if (data.name === "outgoing") {
      return <Default {...this.props} />;
    } else {
      return <Info {...this.props} />;
    }
  }
}

export default connect(state => ({
  orders: OrderSelectors.getOutgoingOrders(state),
  ...createRouteNodeSelector("outgoing")(state)
}))(Index);
