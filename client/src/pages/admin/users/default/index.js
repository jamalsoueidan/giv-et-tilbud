import React from "react";
import {
  withStyles,
  Divider,
  List,
  ListSubheader,
  ListItem,
  ListItemText
} from "@material-ui/core";
import { connect } from "react-redux";
import {
  createRouteNodeSelector,
  actions as RouterActions
} from "redux-router5";
import { actions as UsersActions } from "store/users";
import { Panel, PanelListItem, NavigationLayout, Pagination } from "components";

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
    const { route, navigate } = this.props;
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

  get renderOrders() {
    const { users } = this.props;
    return (
      users.results &&
      users.results.map(user => (
        <PanelListItem
          key={user._id}
          primary={`${user.email}
          `}
          secondary={`Antal værksteder tilknyttet dette bruger: ${
            user.workshops.length
          }`}
          routeName="admin.users.view"
          routeParams={{ id: user._id }}
        />
      ))
    );
  }

  render() {
    const { users, route, navigate } = this.props;
    console.log(users);
    return (
      <NavigationLayout title="Alle brugere" navigation={this.navigation}>
        <Panel title="Alle brugere i systemet">
          <List component="nav">{this.renderOrders}</List>
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
    users: state.users,
    ...createRouteNodeSelector("admin.users")(state)
  }),
  {
    load: UsersActions.loadUsers,
    navigate: RouterActions.navigateTo
  }
)(withStyles(styles)(Orders));
