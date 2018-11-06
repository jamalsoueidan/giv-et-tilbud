import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { actions as OrdersActions } from "../../../store/orders";
import { selectors as DataSelectors } from "../../../store/data";
import { actions as RouterActions } from "redux-router5";
import TablePagination from "@material-ui/core/TablePagination";
import Order from "./_order";

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
    const { orders } = this.props;

    if (!orders.results) {
      return <div>Vent et øjeblik</div>;
    }

    return (
      <Grid container spacing={24} direction="column">
        <Grid item>
          {orders.results.map(order => (
            <Order key={order.id} data={order} />
          ))}
        </Grid>
        <Grid item>
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
        </Grid>
      </Grid>
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
