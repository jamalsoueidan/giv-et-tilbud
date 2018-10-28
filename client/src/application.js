import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { connect } from "react-redux";
import { createRouteNodeSelector } from "redux-router5";
import { TopBar, Navigation } from "./components";
import { actions as OrdersActions } from "./store/orders";
import { routes } from "./core";

const styles = theme => ({
  content: {
    [theme.breakpoints.up("sm")]: {
      paddingTop: "82px"
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: "72px"
    },
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

const findRouteByName = (routeName, routes) => {
  return routes.find(route => route.name === routeName);
};

class MiniDrawer extends React.Component {
  state = {
    open: false,
    loaded: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: !this.state.open });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.props.receive();
  }

  get renderRoute() {
    const route = this.props.route;
    const params = route.route;
    const selectNode = findRouteByName(route.name, routes);
    const Component = selectNode.component;
    return <Component params={params} />;
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <TopBar click={this.handleDrawerOpen} />

        <Navigation open={this.state.open} click={this.handleDrawerOpen} />
        <main className={classes.content}>{this.renderRoute}</main>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    orders: state.orders,
    ...createRouteNodeSelector("")(state)
  }),
  {
    receive: OrdersActions.receive
  }
)(withStyles(styles, { withTheme: true })(MiniDrawer));
