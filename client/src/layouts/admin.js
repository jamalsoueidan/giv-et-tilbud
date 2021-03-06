import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { connect } from "react-redux";
import { createRouteNodeSelector } from "redux-router5";
import { TopBar, AdminNavigation, Notification } from "components";
import { actions as UserActions } from "store/user";
import { actions as NotificationActions } from "store/notification";
import { actions as RouterActions } from "redux-router5";
import localStorage from "local-storage";

//http://sampsonblog.com/simple-throttle-function/
function throttle(callback, limit) {
  var wait = false;
  return function() {
    if (!wait) {
      callback.call();
      wait = true;
      setTimeout(function() {
        wait = false;
      }, limit);
    }
  };
}

const styles = theme => ({
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    padding: "24px",
    [theme.breakpoints.up("sm")]: {
      padding: "92px 40px 0px 40px"
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: "82px"
    }
  }
});

class LoggedIn extends React.Component {
  state = {
    openNavigation: true,
    loaded: false,
    mobile: false
  };

  toggleNavigation = () => {
    this.setState({ openNavigation: !this.state.openNavigation });
  };

  logout = () => {
    const { logout, navigate } = this.props;
    navigate("login");
    logout().then(response => {
      localStorage.remove("user");
    });
  };

  handleResize = () => {
    if (window.innerWidth < 950) {
      this.setState({ openNavigation: false, mobile: true });
    } else {
      this.setState({ openNavigation: true, mobile: false });
    }
  };

  componentDidMount() {
    window.addEventListener("resize", throttle(this.handleResize, 100));
    this.handleResize();
  }

  render() {
    const {
      classes,
      children,
      navigate,
      hideNotification,
      notification,
      route
    } = this.props;
    const { openNavigation, mobile } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <TopBar
          click={this.toggleNavigation}
          logout={this.logout}
          style={{ backgroundColor: "#ff0040" }}
          title="Administrator"
        />

        <AdminNavigation
          open={openNavigation}
          click={this.toggleNavigation}
          mobile={mobile}
          navigate={navigate}
          route={route}
        />
        <main className={classes.content}>{children}</main>
        <Notification hide={hideNotification} notification={notification} />
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    notification: state.notification,
    ...createRouteNodeSelector("admin")(state)
  }),
  {
    logout: UserActions.logout,
    navigate: RouterActions.navigateTo,
    hideNotification: NotificationActions.hideNotification
  }
)(withStyles(styles, { withTheme: true })(LoggedIn));
