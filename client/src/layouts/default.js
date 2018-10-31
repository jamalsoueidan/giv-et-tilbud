import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { connect } from "react-redux";
import { TopBar, Navigation, Notification } from "../components";
import {
  actions as OrdersActions,
  selectors as OrdersSelectors
} from "../store/orders";
import { actions as UserActions } from "../store/user";
import { actions as NotificationActions } from "../store/notification";
import { actions as RouterActions } from "redux-router5";
import localStorage from "local-storage";

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
    openNavigation: false,
    loaded: false
  };

  toggleNavigation = () => {
    this.setState({ openNavigation: !this.state.openNavigation });
  };

  logout = () => {
    this.props.logout().then(response => {
      localStorage.remove("user");
      this.props.navigate("login");
    });
  };

  componentDidMount() {
    this.props.receive();
  }

  render() {
    const { classes, children, statsOrders } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <TopBar click={this.toggleNavigation} logout={this.logout} />

        <Navigation
          open={this.state.openNavigation}
          click={this.toggleNavigation}
          stats={statsOrders}
        />
        <main className={classes.content}>{children}</main>
        <Notification
          hide={this.props.hideNotification}
          notification={this.props.notification}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    statsOrders: OrdersSelectors.statsOrders(state),
    notification: state.notification
  }),
  {
    receive: OrdersActions.receive,
    logout: UserActions.logout,
    navigate: RouterActions.navigateTo,
    hideNotification: NotificationActions.hideNotification
  }
)(withStyles(styles, { withTheme: true })(LoggedIn));
