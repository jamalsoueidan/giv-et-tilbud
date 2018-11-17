import React from "react";
import { connect } from "react-redux";
import { withStyles, Typography } from "@material-ui/core";
import Form from "./create/_form";
import * as yup from "yup";
import { Formik } from "formik";
import { Panel } from "components";
import { actions as UserActions } from "store/user";
import { actions as RouterActions } from "redux-router5";

const styles = theme => ({
  text: {
    margin: theme.spacing.unit * 2
  },
  panel: {
    padding: "20px"
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
    const { createWorkshop, navigate, classes } = this.props;

    return (
      <Panel title="Tilføj et værksted">
        <Typography variant="body1" className={classes.text}>
          Du kan desværre ikke ændre i din oplysninger når du har oprettet
          værkstedet, så sørger for alle oplysninger er rigtige!
        </Typography>
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
      </Panel>
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
