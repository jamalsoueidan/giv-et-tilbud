import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import Form from "./send/_form";
import { Panel, OrderInfo, InformationLayout } from "components";
import * as yup from "yup";
import { Formik } from "formik";
import {
  actions as OrderActions,
  selectors as OrdersSelectors
} from "store/orders";
import { actions as RouterActions } from "redux-router5";
import { selectors as DataSelectors } from "store/data";

const styles = theme => ({});

const validationSchema = yup.object({
  message: yup.string("Enter your message").required("Email is required"),
  price: yup.number("").required("Enter your price")
});

class Send extends React.Component {
  componentDidMount() {
    if (!this.props.order) {
      this.props.loadOrder(this.props.route.params.id);
    }
  }

  render() {
    const { route, sendOffer, selectedWorkshop, order } = this.props;
    const orderId = route.params.id;

    if (!order) {
      return null;
    }

    return (
      <InformationLayout
        title="Send et tilbud"
        information={<OrderInfo order={order} />}
      >
        <Panel>
          <Formik
            render={props => <Form {...props} />}
            validationSchema={validationSchema}
            onSubmit={(values, action) => {
              sendOffer({
                orderId,
                workshopId: selectedWorkshop._id,
                ...values
              }).then(response => {
                this.props.navigate("outgoing.info", {
                  id: orderId
                });
                action.setSubmitting(false);
              });
            }}
          />
        </Panel>
      </InformationLayout>
    );
  }
}

export default connect(
  state => ({
    selectedWorkshop: DataSelectors.getSelectedWorkshop(state),
    order: OrdersSelectors.getIncomingOrderById(state)
  }),
  {
    loadOrder: OrderActions.loadOrder,
    sendOffer: OrderActions.sendOffer,
    navigate: RouterActions.navigateTo
  }
)(withStyles(styles)(Send));
