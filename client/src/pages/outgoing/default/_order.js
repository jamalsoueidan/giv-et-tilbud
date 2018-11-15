import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router5";
import Chip from "@material-ui/core/Chip";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    borderBottom: "1px solid #000"
  },
  chip: {
    marginRight: theme.spacing.unit
  },
  actions: {
    height: "100%"
  }
});

const Order = ({ order, classes }) => {
  return (
    <Grid container spacing={24} className={classes.root}>
      <Grid item xs={12} sm={8}>
        <Grid container direction="column">
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              {order.customer.zip} {order.customer.city}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {order.customer.first_name}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {moment(order.properties.datetime).format(
                "dddd, MMMM Do YYYY, H:mm:ss"
              )}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Chip
              color="primary"
              variant="outlined"
              label={`${order.properties.device} ${order.properties.model}, ${
                order.properties.color
              }`}
              className={classes.chip}
            />
            <Chip color="secondary" label={order.properties.issue} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Grid
          container
          spacing={8}
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.actions}
        >
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              component={Link}
              routeName="outgoing.info"
              routeParams={{ id: order.id }}
            >
              Se tilbud
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              Dit bud: {order.offer.properties.price}
              kr,-
            </Typography>
            <Typography variant="body2">
              Mangler {order.offers_count} tilbud
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Order);
