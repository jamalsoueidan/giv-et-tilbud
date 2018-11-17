import React from "react";
import { connect } from "react-redux";
import { withStyles, Typography, Grid, Divider } from "@material-ui/core";
import Form from "./send/_form";
import { Panel, FormatDate } from "components";
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
      <Grid container spacing={24}>
        <Grid item xs={12} sm={8}>
          <Panel title="Send tilbud">
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
        </Grid>
        <Grid item xs={12} sm={4}>
          <Panel padding>
            <Typography variant="caption">
              Oprettet <FormatDate datetime={order.created_at} />
            </Typography>
            <Typography variant="h6" gutterBottom>
              {order.properties.device} {order.properties.model},{" "}
              {order.properties.color}
            </Typography>

            <Typography variant="body1" gutterBottom>
              {order.properties.issue}
            </Typography>
            <Divider style={{ margin: "16px 0" }} />
            <Typography variant="body2" gutterBottom>
              Kunde informationer:
            </Typography>
            <Typography variant="body1">{order.customer.first_name}</Typography>
            <Typography variant="body1" gutterBottom>
              {order.customer.zip} {order.customer.city}
            </Typography>
          </Panel>
        </Grid>
      </Grid>
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
