import React from "react";
import classnames from "classnames";
import { withStyles, Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    flex: 1
  },
  header: {
    marginBottom: theme.spacing.unit * 2
  }
});

class TwoColumnLayout extends React.Component {
  render() {
    const { classes, title, children, className } = this.props;
    return (
      <div className={classnames(classes.root, className)}>
        <Typography variant="h4" className={classes.header}>
          {title}
        </Typography>

        {children}
      </div>
    );
  }
}

export default withStyles(styles)(TwoColumnLayout);
