import React from "react";
import classnames from "classnames";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    backgroundColor: "#fff"
  },
  title: {
    backgroundColor: "#e8f0f5",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    fontWeight: 300,
    padding: "12px 0",
    margin: "0"
  }
});

class Panel extends React.Component {
  render() {
    const {
      classes,
      title,
      children,
      className,
      padding,
      paddingTop,
      paddingBottom
    } = this.props;

    const style = {};
    if (padding) {
      style.padding = "24px";
    }
    if (paddingTop) {
      style.paddingTop = "24px";
    }
    if (paddingBottom) {
      style.paddingBottom = "24px";
    }

    return (
      <Paper className={classnames(classes.root, className)}>
        <Grid container>
          {title && (
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                gutterBottom
                align="center"
                className={classes.title}
              >
                {title}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12} style={style}>
            {children}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(Panel);
