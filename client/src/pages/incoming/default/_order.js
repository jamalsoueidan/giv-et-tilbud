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

const Order = ({ order, classes }) => {
  return (
    <Grid
      container
      alignItems="center"
      direction="row"
      spacing={16}
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
              label={`${order.properties.device} ${order.properties.model}, ${
                order.properties.color
              }`}
              className={classes.chip}
            />
            <Chip color="secondary" label={order.properties.issue} />
          </Grid>
          <Grid item xs={12}>
            Nær {order.customer.zip} {order.customer.city}
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
