import React from "react";
import { connect } from "react-redux";
import {
  withStyles,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Divider
} from "@material-ui/core";
import { InformationLayout, OrderInfo, Panel } from "components";
import { actions as RouterActions } from "redux-router5";
import OffersInfo from "./_offers_info";

import {
  actions as OrderActions,
  selectors as OrderSelectors
} from "store/orders";

const styles = theme => ({});

class Info extends React.Component {
  componentDidMount() {
    const { order, load, route } = this.props;
    if (!order) {
      load(route.params.id);
    }
  }

  get title() {
    const order = this.props.order;
    return (
      <React.Fragment>
        Resultat af ordre
        {order.offer && order.offer.accepted && (
          <Chip
            color="primary"
            label="Accepteret!"
            style={{ marginLeft: "16px" }}
          />
        )}
      </React.Fragment>
    );
  }

  get orderStatus() {
    const order = this.props.order;
    const offerCount = order.offers.length;

    const accepted = order.offers.find(o => o.accepted);
    if (accepted && offerCount < 3) {
      return (
        <React.Fragment>
          Kunden har accepteret opgaven, selvom der manglede{" "}
          <strong>{3 - offerCount} tilbud!</strong>
        </React.Fragment>
      );
    }

    if (offerCount < 3) {
      return "Opgaven mangler 1 bud tilbage";
    }

    if (!accepted) {
      return "Opgaven mangler valg af tilbud fra kudnen";
    }

    return "Opgaven afventer værksted reperation";
  }

  get statusUrl() {
    const order = this.props.order;
    const key = order.order_status_url.substr(
      order.order_status_url.indexOf("=") + 1
    );
    return `https://givettilbud.myshopify.com/pages/status?token=${
      order.token
    }&key=${key}`;
  }

  get left() {
    const order = this.props.order;
    return (
      <Panel>
        <List>
          <ListItem>
            <ListItemText
              primary="Opgave status"
              secondary={this.orderStatus}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Bud på opgaven"
              secondary={order.offers.length}
            />
          </ListItem>
          <Divider />

          <ListSubheader>Handlinger:</ListSubheader>

          <ListItem button component="a" href={this.statusUrl} target="_blank">
            <ListItemText primary="Se opgave" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Luk opgave" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Slet opgave" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Annullere opgave (accepterede)" />
          </ListItem>
        </List>
      </Panel>
    );
  }

  render() {
    const { order } = this.props;

    if (!order) {
      return null;
    }

    return (
      <InformationLayout title={this.title} information={this.left}>
        <Grid container direction="column" spacing={24}>
          <Grid item>
            <OrderInfo order={order} />
          </Grid>
          <Grid item>
            <OffersInfo order={order} />
          </Grid>
        </Grid>
      </InformationLayout>
    );
  }
}

export default connect(
  state => ({
    order: OrderSelectors.getOrderById(state),
    route: state.router.route
  }),
  {
    load: OrderActions.loadOrderAdmin,
    navigate: RouterActions.navigateTo
  }
)(withStyles(styles)(Info));
