import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { connect } from "react-redux";
import { createRouteNodeSelector } from "redux-router5";
import { startsWithSegment } from "router5-helpers";
import { TopBar, Navigation } from "./components";
import { actions as OrdersActions } from "./store/orders";

import * as Pages from "./pages";

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
    const { params, name } = route;
    const pages = Object.keys(Pages).reduce((destination, key) => {
      destination[key.toLowerCase()] = Pages[key];
      return destination;
    }, {});
    const Component = pages[name];
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
