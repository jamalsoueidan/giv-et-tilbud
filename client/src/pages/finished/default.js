import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import List from "./default/_list";

const styles = theme => ({
  root: {
    flex: 1
  },
  header: {
    margin: `${theme.spacing.unit * 2}px  0 ${theme.spacing.unit * 4}px`
  },
  table: {
    minWidth: 700
  },
  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class Incoming extends React.Component {
  render() {
    const { classes, route } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="h4" className={classes.header}>
          Opgaver der er afsluttet!
        </Typography>

        <Grid container spacing={24}>
          <Grid item xs={12} sm={12}>
            <List route={route} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Incoming);
