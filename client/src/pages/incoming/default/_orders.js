import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { actions as OrdersActions } from "../../../store/orders";
import { selectors as DataSelectors } from "../../../store/data";
import { actions as RouterActions } from "redux-router5";
import TablePagination from "@material-ui/core/TablePagination";

/*get renderHeader() {
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
}*/

const styles = theme => ({});

class Orders extends React.Component {
  updateParams(props) {
    const { selectedWorkshop } = this.props;
    const params = { ...this.props.route.params, ...props };
    this.props.navigate("incoming", params);
    this.props.loadOrders(selectedWorkshop._id, params.page, params.limit);
  }

  handleChangePage = (event, page) => {
    this.updateParams({ page: page });
  };

  handleChangeRowsPerPage = event => {
    this.updateParams({ limit: event.target.value });
  };

  componentDidMount() {
    const { selectedWorkshop } = this.props;
    this.props.loadOrders(selectedWorkshop._id);
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedWorkshop, route, loadOrders } = this.props;
    if (prevProps.selectedWorkshop !== selectedWorkshop) {
      loadOrders(selectedWorkshop._id, route.params.page, route.params.limit);
    }
  }

  render() {
    const { classes, orders } = this.props;

    if (!orders.results) {
      return <div>Vent et øjeblik</div>;
    }

    return (
      <React.Fragment>
        <List component="nav">
          {orders.results.map(order => (
            <ListItem button key={order.id}>
              <ListItemText
                primary={`${order.id} - ${order.created_at}`}
                secondary={`${order.shipping_address.address1} ${
                  order.shipping_address.zip
                } ${order.shipping_address.city}`}
              />
            </ListItem>
          ))}
        </List>
        <TablePagination
          component="div"
          count={orders.count}
          rowsPerPage={orders.limit}
          page={orders.page}
          backIconButtonProps={{
            "aria-label": "Forrige Side"
          }}
          labelRowsPerPage="Rækker per side:"
          nextIconButtonProps={{
            "aria-label": "Næste side"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    selectedWorkshop: DataSelectors.getSelectedWorkshop(state),
    orders: state.orders
  }),
  {
    loadOrders: OrdersActions.loadOrders,
    navigate: RouterActions.navigateTo
  }
)(withStyles(styles)(Orders));
