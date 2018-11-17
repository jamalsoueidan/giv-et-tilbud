import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    backgroundColor: "#fff",
    marginTop: "10px"
  },
  title: {
    backgroundColor: "#e8f0f5",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    fontWeight: 300,
    padding: "12px 0"
  }
});

class Panel extends React.Component {
  get renderTitle() {
    const { classes, title } = this.props;
    if (!title) {
      return null;
    }

    return (
      <Grid item xs={12} style={{ padding: "0 8px" }}>
        <Typography
          variant="subtitle1"
          gutterBottom
          align="center"
          className={classes.title}
        >
          {title}
        </Typography>
      </Grid>
    );
  }

  render() {
    const { classes, children } = this.props;

    return (
      <Paper className={classes.root}>
        <Grid container spacing={16}>
          {this.renderTitle}
          <Grid item xs={12}>
            <Grid container direction="column">
              {children}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(Panel);
