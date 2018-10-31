import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Confirm } from "../../components";
import { actions as RouterActions } from "redux-router5";

import {
  actions as OrderActions,
  selectors as OrderSelectors
} from "../../store/orders";

const styles = theme => ({
  textField: {
    flex: 1
  }
});

class Info extends React.Component {
  state = {
    open: false
  };

  onCancel = () => {
    this.setState({ open: false });
  };

  onConfirm = () => {
    const { cancelOffer, navigate, order } = this.props;
    cancelOffer(order.id).then(response => {
      this.setState({ open: false });
      navigate("outgoing");
    });
  };

  openConfirm = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes, order, offer } = this.props;

    if (!order || !offer) return null;

    const message = offer.properties
      .filter(prop => prop.name === "message")
      .pop();

    const price = offer.properties.filter(prop => prop.name === "price").pop();

    return (
      <React.Fragment>
        <Typography component="h2" variant="h4" gutterBottom>
          Offer Information
        </Typography>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            />
            <Typography variant="h5" component="h2">
              {price.value} kr,-
            </Typography>

            <Typography className={classes.pos} color="textSecondary">
              {moment(offer.created_at).fromNow()}
            </Typography>
            <Typography component="p">{message.value}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={this.openConfirm}>
              Cancel offer
            </Button>
            <Confirm
              open={this.state.open}
              onCancel={this.onCancel}
              onConfirm={this.onConfirm}
              message="You want to cancel this offer"
            />
          </CardActions>
        </Card>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    order: OrderSelectors.getOrder(state),
    offer: OrderSelectors.getOffer(state)
  }),
  {
    cancelOffer: OrderActions.cancelOffer,
    navigate: RouterActions.navigateTo
  }
)(withStyles(styles)(Info));
