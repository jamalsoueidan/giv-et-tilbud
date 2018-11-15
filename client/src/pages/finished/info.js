import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { selectors as OrderSelectors } from "../../store/orders";
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
  componentWillReceiveProps(nextProps) {
    if (!nextProps.order) {
      this.props.navigate("finished");
    }
  }

  componentWillMount() {
    if (!this.props.order) {
      this.props.navigate("finished");
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
            {order.id}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(
  state => ({
    order: OrderSelectors.getFinishedByRouteId(state)
  }),
  {
    navigate: RouterActions.navigateTo
  }
)(withStyles(styles)(Info));
