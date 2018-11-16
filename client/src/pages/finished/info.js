import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  selectors as OrderSelectors,
  actions as OrderActions
} from "../../store/orders";
import { actions as RouterActions } from "redux-router5";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    flex: 1
  },
  header: {
    margin: `${theme.spacing.unit * 2}px  0 ${theme.spacing.unit * 4}px`
  },
  table: {
    minWidth: 700
  },
  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class Info extends React.Component {
  componentDidMount() {
    if (!this.props.order) {
      this.props.loadOrder(this.props.route.params.id);
    }
  }

  render() {
    const { order, classes } = this.props;

    if (!order) {
      return null;
    }

    return (
      <div className={classes.root}>
        <Typography variant="h4" className={classes.header}>
          Information om resultatet af opgaver
        </Typography>

        <Grid container spacing={24}>
          <Grid item xs={12} sm={12}>
            {order.id} <br />
            {order.customer.first_name} {order.customer.last_name}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(
  state => ({
    order: OrderSelectors.getFinishedOrderById(state)
  }),
  {
    loadOrder: OrderActions.loadOrder,
    navigate: RouterActions.navigateTo
  }
)(withStyles(styles)(Info));
