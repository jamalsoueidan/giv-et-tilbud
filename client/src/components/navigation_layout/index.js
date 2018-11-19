import React from "react";
import { withStyles, Grid } from "@material-ui/core";
import Title from "../title";

const styles = theme => ({});

class NavigationLayout extends React.Component {
  render() {
    const {
      title,
      navigation,
      children,
      className,
      navigationColumns,
      childrenColumns
    } = this.props;
    return (
      <Title title={title} className={className}>
        <Grid container spacing={40}>
          {navigation && (
            <Grid item xs={12} sm={navigationColumns || 3}>
              {navigation}
            </Grid>
          )}
          <Grid item xs={12} sm={childrenColumns || 9}>
            {children}
          </Grid>
        </Grid>
      </Title>
    );
  }
}

export default withStyles(styles)(NavigationLayout);
