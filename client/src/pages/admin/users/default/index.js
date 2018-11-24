import React from "react";
import {
  withStyles,
  Divider,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@material-ui/core";
import { Link } from "react-router5";
import { connect } from "react-redux";
import {
  createRouteNodeSelector,
  actions as RouterActions
} from "redux-router5";
import { actions as UsersActions } from "store/users";
import { Panel, NavigationLayout, Pagination } from "components";
import { AccountIcon } from "components/icons";

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
    if (!this.props.users.results) {
      this.load();
    }
  }

  load() {
    const { route, load } = this.props;

    load({
      page: route.params.page,
      limit: route.params.limit,
      search: route.params.search
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { route } = this.props;
    if (route !== prevProps.route) {
      this.load();
    }
  }

  get navigation() {
    return (
      <Panel>
        <List>
          <ListSubheader>Handlinger:</ListSubheader>
          <ListItem button>
            <ListItemText primary="Opret en bruger" />
          </ListItem>
        </List>
      </Panel>
    );
  }

  get renderUsers() {
    const { users } = this.props;
    return (
      users.results &&
      users.results.map(user => (
        <ListItem
          key={user._id}
          component={Link}
          routeName="admin.users.view"
          routeParams={{ id: user._id }}
        >
          <ListItemIcon>
            <AccountIcon />
          </ListItemIcon>
          <ListItemText
            primary={`${user.email}`}
            secondary={`Antal værksteder tilknyttet dette bruger: ${
              user.workshops.length
            }`}
          />
        </ListItem>
      ))
    );
  }

  render() {
    const { users, route, navigate } = this.props;

    return (
      <NavigationLayout title="Alle brugere" navigation={this.navigation}>
        <Panel title="Alle brugere i systemet">
          <List component="nav">{this.renderUsers}</List>
          <Divider />
          <Pagination
            count={users.count}
            rowsPerPage={users.limit}
            page={users.page}
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
    users: state.users.all,
    ...createRouteNodeSelector("admin.users")(state)
  }),
  {
    load: UsersActions.loadUsers,
    navigate: RouterActions.navigateTo
  }
)(withStyles(styles)(Orders));
