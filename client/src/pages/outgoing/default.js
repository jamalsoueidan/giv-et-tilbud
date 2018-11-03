import React from "react";
import moment from "moment";
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

class Outgoing extends React.Component {
  renderCell(value, key) {
    return (
      <TableCell component="th" scope="row" key={key}>
        {value}
      </TableCell>
    );
  }

  get renderHeader() {
    const { orders } = this.props;
    const columns = orders[0].line_items[0].properties;

    return (
      <TableHead>
        <TableRow>
          {columns.map(c => this.renderCell(c.name, c._id))}
          {this.renderCell("By")}
          {this.renderCell("PostNummer")}
          {this.renderCell("Dato oprettet")}
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
              {row.line_items[0].properties.map(c =>
                this.renderCell(c.value, c._id)
              )}
              {this.renderCell(row.shipping_address.city)}
              {this.renderCell(row.shipping_address.zip)}
              {this.renderCell(moment(row.created_at).fromNow())}
              <TableCell component="th" scope="row">
                <Button
                  color="primary"
                  className={classes.button}
                  component={Link}
                  routeName="outgoing.info"
                  routeParams={{ id: row.id }}
                >
                  Se info
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

    if (this.props.orders.length === 0)
      return <div>No outgoing orders, go and send offers</div>;

    return (
      <React.Fragment>
        <Typography component="h2" variant="h1" gutterBottom>
          Outgoing orders
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

export default withStyles(styles)(Outgoing);