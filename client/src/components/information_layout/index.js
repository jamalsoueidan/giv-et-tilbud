import React from "react";
import { withStyles, Grid } from "@material-ui/core";
import Title from "../title";

const styles = theme => ({});

class InformationLayout extends React.Component {
  render() {
    const { title, information, children, className } = this.props;
    return (
      <Title title={title} className={className}>
        <Grid container spacing={40}>
          <Grid item xs={12} sm={8}>
            {children}
          </Grid>
          <Grid item xs={12} sm={4}>
            {information || ""}
          </Grid>
        </Grid>
      </Title>
    );
  }
}

export default withStyles(styles)(InformationLayout);
