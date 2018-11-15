import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router5";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { selectors as DataSelectors } from "../../store/data";
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
  order: {
    marginBottom: theme.spacing.unit,
    display: "flex",
    alignItems: "center"
  },
  button: {
    marginLeft: theme.spacing.unit
  }
});

class Incoming extends React.Component {
  componentDidMount() {
    const { selectedWorkshop, loadIncoming } = this.props;

    loadIncoming({ workshopId: selectedWorkshop._id });
  }

  render() {
    const { orders, classes, selectedWorkshop } = this.props;

    if (!orders.results) {
      return <div>Vent et øjeblik</div>;
    }

    return (
      <div className={classes.root}>
        <Typography variant="h5" className={classes.header}>
          Seneste 5 opgaver fra {selectedWorkshop.name}
        </Typography>
        <Grid container spacing={24} direction="column">
          <Grid item>
            {orders.results.map(order => (
              <div key={order.id} className={classes.order}>
                {order.customer.first_name} har oprettet en opgave
                <Button
                  color="primary"
                  variant="contained"
                  component={Link}
                  routeName="incoming.send"
                  className={classes.button}
                  routeParams={{ id: order.id }}
                >
                  Send et tilbud
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
    selectedWorkshop: DataSelectors.getSelectedWorkshop(state),
    route: state.router.route,
    orders: state.orders.incoming
  }),
  {
    loadIncoming: OrdersActions.loadIncoming,
    navigate: RouterActions.navigateTo
  }
)(withStyles(styles)(Incoming));
