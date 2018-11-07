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
    const { route } = this.props;
    const params = { ...route.params, ...props };
    this.props.navigate("finished", params);
    this.props.load({
      page: params.page,
      limit: params.limit
    });
  }

  handleChangePage = (event, page) => {
    this.updateParams({ page: page });
  };

  handleChangeRowsPerPage = event => {
    this.updateParams({ limit: event.target.value });
  };

  componentDidMount() {
    this.props.load();
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
    orders: state.orders.finished
  }),
  {
    load: OrdersActions.loadFinished,
    navigate: RouterActions.navigateTo
  }
)(withStyles(styles)(Orders));
