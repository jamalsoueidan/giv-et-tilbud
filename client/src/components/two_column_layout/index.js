import React from "react";
import classnames from "classnames";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flex: 1
  },
  header: {
    marginBottom: theme.spacing.unit * 4
  }
});

class TwoColumnLayout extends React.Component {
  render() {
    const { classes, title, navigation, page, className } = this.props;
    return (
      <div className={classnames(classes.root, className)}>
        <Typography variant="h4" className={classes.header}>
          {title}
        </Typography>

        <Grid container spacing={40}>
          <Grid item xs={12} sm={3}>
            {navigation}
          </Grid>
          <Grid item xs={12} sm={9}>
            {page}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(TwoColumnLayout);
