import React from "react";
import { withStyles, Divider, List } from "@material-ui/core";
import { connect } from "react-redux";
import {
  createRouteNodeSelector,
  actions as RouterActions
} from "redux-router5";
import {
  actions as OrdersActions,
  selectors as OrdersSelectors
} from "store/orders";
import { Panel, PanelListItem, NavigationLayout, Pagination } from "components";
import Filters from "./_filters";

const styles = theme => ({
  root: {
    flex: 1
  },
  link: {
    justifyContent: "flex-start"
  }
});

class Orders extends React.Component {
  componentDidMount() {
    if (!this.props.orders.results) {
      this.load();
    }
  }

  load() {
    const { route, load } = this.props;

    load({
      page: route.params.page,
      limit: route.params.limit,
      device: route.params.device,
      issue: route.params.issue
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { route } = this.props;
    if (route !== prevProps.route) {
      this.load();
    }
  }

  get navigation() {
    const { route, navigate } = this.props;
    return (
      <Panel title="Navigation">
        <Filters navigate={navigate} route={route} />
      </Panel>
    );
  }

  get renderOrders() {
    const { orders } = this.props;
    return (
      orders.results &&
      orders.results.map(order => (
        <PanelListItem
          key={order.id}
          primary={order.id}
          secondary={`${order.email}`}
          routeName="admin.orders.view"
          routeParams={{ id: order._id }}
        />
      ))
    );
  }

  render() {
    const { orders, route, navigate } = this.props;

    return (
      <NavigationLayout title="Alle opgaver" navigation={this.navigation}>
        <Panel title="Alle opgaver">
          <List component="nav">{this.renderOrders}</List>
          <Divider />
          <Pagination
            count={orders.count}
            rowsPerPage={orders.limit}
            page={orders.page}
            navigate={navigate}
            route={route}
          />
        </Panel>
      </NavigationLayout>
    );
  }
}

export default connect(
  state => ({
    orders: OrdersSelectors.getOrders(state),
    ...createRouteNodeSelector("admin.orders")(state)
  }),
  {
    load: OrdersActions.loadOrders,
    navigate: RouterActions.navigateTo
  }
)(withStyles(styles)(Orders));
