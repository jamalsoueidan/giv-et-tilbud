import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { connect } from "react-redux";
import { createRouteNodeSelector } from "redux-router5";
import { startsWithSegment } from "router5-helpers";
import { TopBar, Navigation } from "./components";

import { Home } from "./pages";

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
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: !this.state.open });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, route } = this.props;
    const { params, name } = route;

    console.log(route);
    return (
      <React.Fragment>
        <CssBaseline />
        <TopBar click={this.handleDrawerOpen} />

        <Navigation open={this.state.open} click={this.handleDrawerOpen} />
        <main className={classes.content}>
          <Home params={params} />
        </main>
      </React.Fragment>
    );
  }
}

export default connect(createRouteNodeSelector(""))(
  withStyles(styles, { withTheme: true })(MiniDrawer)
);
