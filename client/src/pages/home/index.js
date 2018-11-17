import React from "react";
import Grid from "@material-ui/core/Grid";
import Incoming from "./_incoming";
import Finished from "./_finished";
import Welcome from "./_welcome";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {}
});

class Home extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <Finished />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Incoming />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Welcome />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
