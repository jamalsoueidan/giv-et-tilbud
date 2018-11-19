import React from "react";
import {
  withStyles,
  Divider,
  List,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import { connect } from "react-redux";
import {
  createRouteNodeSelector,
  actions as RouterActions
} from "redux-router5";
import { actions as WorkshopsActions } from "store/workshops";
import {
  Panel,
  ListItem,
  NavigationLayout,
  Pagination,
  Search
} from "components";

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
    if (!this.props.workshops.results) {
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

  get renderOrders() {
    const { workshops } = this.props;
    return (
      workshops.results &&
      workshops.results.map(workshop => (
        <ListItem
          key={workshop._id}
          routeName="admin.workshops.view"
          routeParams={{ id: workshop._id }}
        >
          <ListItemText
            primary={`${workshop.name}`}
            secondary={`${workshop.address}, ${workshop.zip} ${workshop.city}`}
          />
          <ListItemSecondaryAction style={{ marginRight: "24px" }}>
            {`${workshop.offers_length}`} oprettet bud
          </ListItemSecondaryAction>
        </ListItem>
      ))
    );
  }

  render() {
    const { workshops, route, navigate } = this.props;

    return (
      <NavigationLayout title="Alle værksteder" childrenColumns={12}>
        <Panel title="Visning af alle værksteder">
          <Search navigate={navigate} route={route} />
          <List component="nav">{this.renderOrders}</List>
          <Divider />
          <Pagination
            count={workshops.count}
            rowsPerPage={workshops.limit}
            page={workshops.page}
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
    workshops: state.workshops.all,
    ...createRouteNodeSelector("admin.workshops")(state)
  }),
  {
    load: WorkshopsActions.loadWorkshops,
    navigate: RouterActions.navigateTo
  }
)(withStyles(styles)(Orders));
