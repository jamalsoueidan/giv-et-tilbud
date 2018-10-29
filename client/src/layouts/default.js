import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { connect } from "react-redux";
import { TopBar, Navigation } from "../components";
import { actions as OrdersActions } from "../store/orders";

const styles = theme => ({
  content: {
    display: "flex",
    flexDirection: "column",
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

class LoggedIn extends React.Component {
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

  render() {
    const { classes, children } = this.props;
    console.log("default layout");
    return (
      <React.Fragment>
        <CssBaseline />
        <TopBar click={this.handleDrawerOpen} />

        <Navigation open={this.state.open} click={this.handleDrawerOpen} />
        <main className={classes.content}>{children}</main>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    orders: state.orders
  }),
  {
    receive: OrdersActions.receive
  }
)(withStyles(styles, { withTheme: true })(LoggedIn));
