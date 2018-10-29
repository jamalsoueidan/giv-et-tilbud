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
import { createRouteNodeSelector } from "redux-router5";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
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
  get renderHeader() {
    const { orders } = this.props;
    const columns = orders[0].line_items[0].properties;

    return (
      <TableHead>
        <TableRow>
          {columns.map(c => {
            return (
              <TableCell component="th" scope="row" key={c._id}>
                {c.name}
              </TableCell>
            );
          })}
          <TableCell component="th" scope="row">
            By
          </TableCell>
          <TableCell component="th" scope="row">
            PostNummer
          </TableCell>
          <TableCell component="th" scope="row">
            Dato oprettet
          </TableCell>
          <TableCell component="th" scope="row" />
        </TableRow>
      </TableHead>
    );
  }

  renderLink = itemProps => <Link {...itemProps} />;

  get renderBody() {
    const { orders, classes } = this.props;

    return (
      <TableBody>
        {orders.map(row => {
          return (
            <TableRow key={row._id} hover>
              {row.line_items[0].properties.map(c => {
                return (
                  <TableCell component="th" scope="row" key={c._id}>
                    {c.value}
                  </TableCell>
                );
              })}
              <TableCell component="th" scope="row">
                {row.shipping_address.city}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.shipping_address.zip}
              </TableCell>
              <TableCell component="th" scope="row">
                {moment(row.created_at).fromNow()}
              </TableCell>
              <TableCell component="th" scope="row">
                <Button
                  color="primary"
                  className={classes.button}
                  component={Link}
                  routeName="incoming.send"
                  routeParams={{ id: row.id }}
                >
                  Send et tilbud
                  <EditIcon className={classes.extendedIcon} />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    );
  }

  render() {
    const classes = this.props.classes;
    console.log("lets go", this.props.route);
    if (this.props.orders.length === 0) return <div>Zero orders</div>;

    return (
      <React.Fragment>
        <Typography component="h2" variant="h1" gutterBottom>
          Incoming orders
        </Typography>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            {this.renderHeader}
            {this.renderBody}
          </Table>
        </Paper>
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  orders: state.orders
}))(withStyles(styles)(Incoming));
