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

const Order = ({ data, classes }) => {
  const phone = properties => {
    return `${properties.device} ${properties.model}, ${properties.color}`;
  };

  const properties = data.line_items[0].properties.reduce(
    (properties, property) => {
      properties[property.name] = property.value;
      return properties;
    },
    {}
  );

  const order = {
    created_at: data.created_at,
    id: data.id,
    offers_count: 3 - data.offers_count
  };

  const customer = {
    first_name: data.customer.first_name,
    address: data.shipping_address.address1,
    zip: data.shipping_address.zip,
    city: data.shipping_address.city
  };

  const price = data.offer.properties.find(p => p.name === "price").value;

  return (
    <Grid container spacing={24} className={classes.root}>
      <Grid item xs={12} sm={8}>
        <Grid container direction="column">
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              {customer.zip} {customer.city}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {customer.first_name}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {moment(properties.datetime).format(
                "dddd, MMMM Do YYYY, H:mm:ss"
              )}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Chip
              color="primary"
              variant="outlined"
              label={`${phone(properties)}`}
              className={classes.chip}
            />
            <Chip color="secondary" label={properties.issue} />
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
              Dit bud: {price}
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
