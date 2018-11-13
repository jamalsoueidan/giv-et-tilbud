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
    padding: `${theme.spacing.unit}px 0`,
    borderBottom: "1px solid #000"
  },
  device: {
    margin: `${theme.spacing.unit}px 0`
  },
  chip: {
    marginRight: theme.spacing.unit
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
    offers_count: data.offers_count
  };

  const customer = {
    first_name: data.customer.first_name,
    address: data.shipping_address.address1,
    zip: data.shipping_address.zip,
    city: data.shipping_address.city
  };

  return (
    <Grid
      container
      alignItems="center"
      direction="row"
      spacing={12}
      className={classes.root}
    >
      <Grid item xs={12} sm={6}>
        <Grid container direction="column">
          <Grid item xs={12}>
            <Typography variant="body2">
              Oprettet{" "}
              {moment(order.created_at).format("Do MMMM  YYYY, H:mm:ss")}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.device}>
            <Chip
              color="primary"
              variant="outlined"
              label={`${phone(properties)}`}
              className={classes.chip}
            />
            <Chip color="secondary" label={properties.issue} />
          </Grid>
          <Grid item xs={12}>
            Nær {customer.zip} {customer.city}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid
          container
          direction="column"
          spacing={8}
          align="right"
          className={classes.actions}
        >
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              component={Link}
              routeName="incoming.send"
              routeParams={{ id: order.id }}
            >
              Send et tilbud
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="body2">
              {order.offers_count > 0 &&
                `Der er allerede ${order.offers_count} bud!`}
              {order.offers_count === 0 && `Ingen bud endnu!`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Order);
