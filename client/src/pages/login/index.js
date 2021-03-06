import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Formik } from "formik";
import Form from "./_form";
import * as yup from "yup";
import { connect } from "react-redux";
import { actions as UserActions } from "../../store/user";
import { actions as RouterActions } from "redux-router5";
import localStorage from "local-storage";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("")
    .min(8, "Password must contain at least 8 characters")
    .required("Enter your password")
});

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class Login extends React.Component {
  redirectToApplication(user) {
    const { route, navigate } = this.props;

    const nextRoute = route.params;
    if (!nextRoute.nextName) {
      /**
       * @todo Must be taken from router options in the core/router.js, which route name is set as default
       * createRouter(routes, { defaultRoute: "login" })
       */
      if (user.is_admin) {
        nextRoute.nextName = "admin";
      } else {
        nextRoute.nextName = "home";
      }
    }

    navigate(nextRoute.nextName, nextRoute.nextParams);
  }

  render() {
    const { classes, login } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Formik
              render={props => <Form {...props} />}
              validationSchema={validationSchema}
              onSubmit={(values, action) => {
                login(values.email, values.password).then(response => {
                  if (!response.error) {
                    const user = JSON.stringify(response.payload);
                    if (user.is_admin) {
                      localStorage("admin", user);
                    } else {
                      localStorage("user", user);
                    }
                    this.redirectToApplication(response.payload);
                  }
                  action.setSubmitting(false);
                });
              }}
            />
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    user: state.user,
    route: state.router.route
  }),
  {
    login: UserActions.login,
    navigate: RouterActions.navigateTo
  }
)(withStyles(styles)(Login));
