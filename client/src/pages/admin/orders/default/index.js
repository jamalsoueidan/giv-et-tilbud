import React from "react";
import {
  withStyles,
  Divider,
  List,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon
} from "@material-ui/core";
import { connect } from "react-redux";
import {
  createRouteNodeSelector,
  actions as RouterActions
} from "redux-router5";
import {
  actions as OrdersActions,
  selectors as OrdersSelectors
} from "store/orders";
import {
  Panel,
  ListItem,
  NavigationLayout,
  Pagination,
  Search
} from "components";
import Filters from "./_filters";
import { BuildIcon } from "components/icons";

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
    load(route.params);
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
        <Search navigate={navigate} route={route} />
        <Filters navigate={navigate} route={route} />
      </Panel>
    );
  }

  get renderOrders() {
    const { orders } = this.props;
    return (
      orders.results &&
      orders.results.map(order => (
        <ListItem
          key={order.id}
          routeName="admin.orders.view"
          routeParams={{ id: order.id }}
        >
          <ListItemIcon>
            <BuildIcon />
          </ListItemIcon>
          <ListItemText
            primary={`${order.properties.device} ${order.properties.model}, ${
              order.properties.color
            }`}
            secondary={`${order.customer.first_name} ${
              order.customer.last_name
            }, ${order.phone}`}
          />
          <ListItemSecondaryAction style={{ marginRight: "24px" }}>
            {`${order.offers.length}`} bud
          </ListItemSecondaryAction>
        </ListItem>
      ))
    );
  }

  render() {
    const { orders, route, navigate } = this.props;

    return (
      <NavigationLayout title="Alle opgaver" navigation={this.navigation}>
        <Panel title={`Alle opgaver ${orders.count}`}>
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
