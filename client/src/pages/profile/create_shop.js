import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Form from "./createShop/_form";
import * as yup from "yup";
import { Formik } from "formik";
import { actions as UserActions } from "../../store/user";
import { actions as RouterActions } from "redux-router5";

const styles = theme => ({
  textField: {
    flex: 1
  }
});

const validationSchema = yup.object({
  name: yup.string("").required(),
  address: yup.string("").required(),
  zip: yup.string("").required(),
  city: yup.string().required(),
  email: yup.string("").required(),
  phone: yup.number("").required()
});

class Send extends React.Component {
  render() {
    const { createWorkshop, navigate } = this.props;

    return (
      <React.Fragment>
        <Typography component="h2" variant="h4" gutterBottom>
          Tilføj et værksted
        </Typography>
        <p>
          Du kan desværre ikke ændre i din oplysninger når du har oprettet
          værkstedet, så sørger for alle oplysninger er rigtige!
        </p>
        <Formik
          render={props => <Form {...props} />}
          validationSchema={validationSchema}
          onSubmit={(values, action) => {
            createWorkshop(values).then(response => {
              navigate("profile");
              action.setSubmitting(false);
            });
          }}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  {
    createWorkshop: UserActions.createWorkshop,
    navigate: RouterActions.navigateTo
  }
)(withStyles(styles)(Send));
