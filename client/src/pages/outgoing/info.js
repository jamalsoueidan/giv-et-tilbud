import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Typography, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import UserContext from "../../contexts/user";

const styles = theme => ({
  textField: {
    flex: 1
  }
});

class Info extends React.Component {
  static contextType = UserContext;

  render() {
    const { classes, orders, route } = this.props;

    const customerId = this.context.customerId;

    const order = orders
      .filter(order => order.id === Number(route.params.id))
      .pop();
    if (!order) {
      //because orders is not loaded yet!
      return null;
    }

    const offer = order.offers
      .filter(offer => offer.customerId === customerId)
      .pop();

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
            <Button size="small">Cancel offer</Button>
          </CardActions>
        </Card>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Info);
