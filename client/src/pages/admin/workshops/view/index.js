import React from "react";
import {
  withStyles,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ListSubheader
} from "@material-ui/core";
import { connect } from "react-redux";
import { actions as RouterActions } from "redux-router5";
import { InformationLayout, WorkshopInfo, Panel } from "components";
import OffersOrderInfo from "./_offers_order_info";
import {
  actions as WorkshopsActions,
  selectors as WorkshopsSelectors
} from "store/workshops";
import { StoreIcon, AccountIcon } from "components/icons";

const styles = theme => ({});

class Default extends React.Component {
  componentDidMount() {
    const { workshop, route, load } = this.props;
    if (!workshop || route.params.id !== workshop._id) {
      load(route.params);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { route, load } = this.props;
    if (route !== prevProps.route) {
      load(route.params);
    }
  }

  get left() {
    const workshop = this.props.payload.results;
    const offersLength = (workshop.offers && workshop.offers.length) || 0;
    return (
      <Panel>
        <List>
          <ListItem>
            <ListItemIcon>
              <AccountIcon />
            </ListItemIcon>
            <ListItemText
              primary="Konto oplysninger"
              secondary={`${workshop.user.email}`}
            />
          </ListItem>

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
        </List>
      </Panel>
    );
  }

  get title() {
    const payload = this.props.payload;
    const workshop = payload.results;

    return (
      <React.Fragment>
        <StoreIcon /> {workshop.name} værksted
      </React.Fragment>
    );
  }

  render() {
    const { payload, route, navigate } = this.props;

    if (!payload) return null;

    const workshop = payload.results;

    return (
      <InformationLayout title={this.title} information={this.left}>
        <Grid container direction="column" spacing={24}>
          <Grid item>
            <WorkshopInfo workshop={workshop} />
          </Grid>
          {workshop.offers && (
            <Grid item>
              <OffersOrderInfo
                payload={payload}
                route={route}
                navigate={navigate}
              />
            </Grid>
          )}
        </Grid>
      </InformationLayout>
    );
  }
}

export default connect(
  state => ({
    payload: WorkshopsSelectors.getUserByWorkshopId(state)
  }),
  {
    load: WorkshopsActions.loadById,
    navigate: RouterActions.navigateTo
  }
)(withStyles(styles)(Default));
