import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router5";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { actions as OrdersActions } from "../../store/orders";
import { actions as RouterActions } from "redux-router5";

const styles = theme => ({
  root: {
    backgroundColor: "#fff",
    padding: theme.spacing.unit * 2,
    height: "100%",
    boxShadow: "0 1px 1px rgba(0,0,0,.15)"
  },
  header: {
    marginBottom: theme.spacing.unit * 1.5
  },
  offer: {
    marginBottom: theme.spacing.unit,
    display: "flex",
    alignItems: "center"
  },
  button: {
    marginLeft: theme.spacing.unit
  }
});

class Finished extends React.Component {
  componentDidMount() {
    this.props.loadAccepted();
  }

  render() {
    const { orders, classes } = this.props;

    if (!orders.results) {
      return <div>Vent et øjeblik</div>;
    }

    return (
      <div className={classes.root}>
        <Typography variant="h5" className={classes.header}>
          Accepteret tilbud!
        </Typography>
        <Grid container spacing={24} direction="column">
          <Grid item>
            {orders.results.map(order => (
              <div key={order.id} className={classes.offer}>
                {order.customer.first_name} {order.customer.last_name} har
                accepteret dit bud!{" "}
                <Button
                  color="primary"
                  variant="contained"
                  component={Link}
                  className={classes.button}
                  routeName="finished.info"
                  routeParams={{ id: order.id }}
                >
                  Se info
                </Button>
              </div>
            ))}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(
  state => ({
    orders: state.orders.accepted
  }),
  {
    loadAccepted: OrdersActions.loadAccepted,
    navigate: RouterActions.navigateTo
  }
)(withStyles(styles)(Finished));
