import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { connect } from "react-redux";
import { TopBar, Navigation } from "../components";
import { actions as OrdersActions } from "../store/orders";
import { actions as UserActions } from "../store/user";
import localStorage from "local-storage";
import { actions as RouterActions } from "redux-router5";
import UserContext from "../contexts/user";

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
    const { classes, children, user } = this.props;

    return (
      <UserContext.Provider value={user}>
        <CssBaseline />
        <TopBar click={this.handleDrawerOpen} logout={this.logout} />

        <Navigation open={this.state.open} click={this.handleDrawerOpen} />
        <main className={classes.content}>{children}</main>
      </UserContext.Provider>
    );
  }
}

export default connect(
  state => ({
    user: state.user,
    orders: state.orders
  }),
  {
    receive: OrdersActions.receive,
    logout: UserActions.logout,
    navigate: RouterActions.navigateTo
  }
)(withStyles(styles, { withTheme: true })(LoggedIn));
