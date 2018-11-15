import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  actions as OrdersActions,
  selectors as OrdersSelectors
} from "../../../store/orders";
import { selectors as DataSelectors } from "../../../store/data";
import { actions as RouterActions } from "redux-router5";
import TablePagination from "@material-ui/core/TablePagination";
import Order from "./_order";

const styles = theme => ({});

class Orders extends React.Component {
  updateParams(params = {}) {
    const { route, navigate } = this.props;
    navigate("incoming", { ...route.params, ...params });
  }

  load() {
    const { selectedWorkshop, route, loadIncoming } = this.props;

    loadIncoming({
      workshopId: selectedWorkshop._id,
      page: route.params.page,
      limit: route.params.limit,
      device: route.params.device,
      issue: route.params.issue
    });
  }

  handleChangePage = (event, page) => {
    this.updateParams({ page: page });
  };

  handleChangeRowsPerPage = event => {
    this.updateParams({ limit: event.target.value });
  };

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedWorkshop, route } = this.props;
    if (prevProps.selectedWorkshop !== selectedWorkshop) {
      this.load();
    } else if (route !== prevProps.route) {
      this.load();
    }
  }

  render() {
    const { orders } = this.props;

    if (!orders.results) {
      return <div>Vent et øjeblik</div>;
    }

    if (orders.results.length === 0) {
      return <div>Ingen opgaver oprettet</div>;
    }

    return (
      <Grid container spacing={24} direction="column">
        <Grid item>
          {orders.results.map(order => (
            <Order key={order.id} order={order} />
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
    route: state.router.route,
    orders: OrdersSelectors.getIncoming(state)
  }),
  {
    loadIncoming: OrdersActions.loadIncoming,
    navigate: RouterActions.navigateTo
  }
)(withStyles(styles)(Orders));
