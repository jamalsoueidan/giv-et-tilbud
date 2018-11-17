import React from "react";
import { connect } from "react-redux";
import { withStyles, Typography, Chip } from "@material-ui/core";
import { InformationLayout, OrderInfo, Panel } from "components";
import { actions as RouterActions } from "redux-router5";

import {
  actions as OrderActions,
  selectors as OrderSelectors
} from "../../store/orders";

const styles = theme => ({});

class Info extends React.Component {
  componentDidMount() {
    if (!this.props.order) {
      this.props.loadOrder(this.props.route.params.id);
    }
  }

  render() {
    const { order } = this.props;

    if (!order) {
      return null;
    }

    return (
      <InformationLayout
        title={
          <React.Fragment>
            Resultat af ordre
            {order.offer.accepted && (
              <Chip
                color="primary"
                label="Accepteret!"
                style={{ marginLeft: "16px" }}
              />
            )}
          </React.Fragment>
        }
      >
        <OrderInfo order={order} />
      </InformationLayout>
    );
  }
}

export default connect(
  state => ({
    order: OrderSelectors.getOutgoingOrderById(state)
  }),
  {
    loadOrder: OrderActions.loadOrder,
    navigate: RouterActions.navigateTo
  }
)(withStyles(styles)(Info));
