import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    backgroundColor: "#fff",
    padding: theme.spacing.unit * 2,
    boxShadow: "0 1px 1px rgba(0,0,0,.15)"
  },
  header: {
    marginBottom: theme.spacing.unit * 1.5
  }
});

class Welcome extends React.Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <Typography variant="h5" className={classes.header}>
          Velkommen til platformen, blah blah!
        </Typography>
        <Typography variant="body1">
          blah blah blah blah blah blah blah blah
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Welcome);
