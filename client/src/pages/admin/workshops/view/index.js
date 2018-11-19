import React from "react";
import {
  withStyles,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListSubheader
} from "@material-ui/core";
import { connect } from "react-redux";
import {
  createRouteNodeSelector,
  actions as RouterActions
} from "redux-router5";
import { InformationLayout, WorkshopInfo, Panel } from "components";
import { actions as WorkshopsActions } from "store/workshops";

const styles = theme => ({});

class Default extends React.Component {
  componentDidMount() {
    const { workshop, route, load } = this.props;
    if (!workshop || route.params.id !== workshop._id) {
      load(route.params.id);
    }
  }

  get left() {
    const workshop = this.props.workshop;
    const offersLength = (workshop.offers && workshop.offers.length) || 0;
    return (
      <Panel>
        <List>
          <ListItem>
            <ListItemText
              primary="Antal bud på opgaver"
              secondary={offersLength}
            />
          </ListItem>

          <Divider />

          <ListSubheader>Handlinger:</ListSubheader>

          <ListItem button>
            <ListItemText primary="Luk værksted" />
          </ListItem>

          <ListItem button>
            <ListItemText primary="Gå til kontoejer" />
          </ListItem>
        </List>
      </Panel>
    );
  }

  render() {
    const workshop = this.props.workshop;

    if (!workshop) return null;

    return (
      <InformationLayout title={workshop.name} information={this.left}>
        <Grid container direction="column" spacing={24}>
          <Grid item>
            <WorkshopInfo workshop={workshop} />
          </Grid>
          <Grid item>bud på opgaver...</Grid>
          <Grid item>opgave list?</Grid>
        </Grid>
      </InformationLayout>
    );
  }
}

export default connect(
  state => ({
    workshop: state.workshops.current
  }),
  {
    load: WorkshopsActions.loadById,
    navigate: RouterActions.navigateTo
  }
)(withStyles(styles)(Default));
