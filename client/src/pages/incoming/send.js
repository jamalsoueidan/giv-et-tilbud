import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Form from "./_form";
import * as yup from "yup";
import { Formik } from "formik";
import { actions as OrderActions } from "../../store/orders";
import { actions as RouterActions } from "redux-router5";
import { selectors as DataSelectors } from "../../store/data";

const styles = theme => ({
  textField: {
    flex: 1
  }
});

const validationSchema = yup.object({
  message: yup.string("Enter your message").required("Email is required"),
  price: yup.number("").required("Enter your price")
});

class Send extends React.Component {
  render() {
    const { route, sendOffer, selectedWorkshop } = this.props;
    const orderId = route.params.id;

    return (
      <React.Fragment>
        <Typography component="h2" variant="h4" gutterBottom>
          Send offer
        </Typography>
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
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    selectedWorkshop: DataSelectors.getSelectedWorkshop(state)
  }),
  {
    sendOffer: OrderActions.sendOffer,
    navigate: RouterActions.navigateTo
  }
)(withStyles(styles)(Send));
