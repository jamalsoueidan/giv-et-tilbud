import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Add";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router5";
import { selectors as OrderSelectors } from "../../store/orders";
import Grid from "@material-ui/core/Grid";
import Dropdown from "./default/_dropdown";
import Orders from "./default/_orders";

const styles = theme => ({
  root: {
    flex: 1
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

class Incoming extends React.Component {
  render() {
    const { classes, route } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="h3" gutterBottom>
          Incoming orders
        </Typography>

        <Grid container spacing={24}>
          <Grid item xs={12} sm={3}>
            <Dropdown />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Orders route={route} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Incoming);
