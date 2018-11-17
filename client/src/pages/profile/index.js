import React from "react";
import {
  withStyles,
  List,
  ListItem,
  ListItemText,
  ListSubheader
} from "@material-ui/core";
import { connect } from "react-redux";
import { createRouteNodeSelector } from "redux-router5";
import { Link } from "react-router5";
import Default from "./default";
import RouterHelper from "lib/router_helper";
import Workshops from "./workshops";
import { PanelList, PanelListItem, TwoColumnLayout } from "components";

const styles = theme => ({
  root: {
    flex: 1
  },
  link: {
    justifyContent: "flex-start"
  }
});

class Index extends React.Component {
  get renderPage() {
    const { route, user } = this.props;

    if (route.name.indexOf("workshops") !== -1) {
      return <Workshops route={route} user={user} />;
    }

    return <Default route={route} user={user} />;
  }

  get navigation() {
    const { route, classes } = this.props;
    return (
      <PanelList title="Navigation">
        <PanelListItem
          routeName="profile"
          primary="Profil"
          selected={route.name === "profile"}
        />
        <PanelListItem
          routeName="profile.workshops"
          primary="Værksteder"
          selected={route.name.indexOf("workshops") !== -1}
        />
      </PanelList>
    );
  }

  render() {
    return (
      <TwoColumnLayout
        title="Profile"
        navigation={this.navigation}
        page={this.renderPage}
      />
    );
  }
}

export default connect(state => ({
  user: state.user,
  ...createRouteNodeSelector("profile")(state)
}))(withStyles(styles)(Index));
