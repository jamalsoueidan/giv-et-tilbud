import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Panel } from "components";

const styles = theme => ({});

class Default extends React.Component {
  render() {
    const { classes } = this.props;
    return <Panel title="Din profile side">test</Panel>;
  }
}

export default withStyles(styles)(Default);
