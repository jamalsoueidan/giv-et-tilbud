import React from "react";
import Workshop from "./default/_workshop";
import { withStyles, Typography, List, Divider } from "@material-ui/core";
import { Panel, Link, Actions } from "components";

const styles = theme => ({});

class View extends React.Component {
  render() {
    const { route, user } = this.props;
    const workshop = user.workshops.find(w => w._id === route.params.id);
    console.log();
    return (
      <Panel title={workshop.name} padding>
        <Typography variant="subtitle1" gutterBottom>
          {workshop.name}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {workshop.address}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {workshop.zip} {workshop.city}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Email:</strong> {workshop.email}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Mobilnr:</strong> +45 {workshop.phone}
        </Typography>
      </Panel>
    );
  }
}

export default withStyles(styles)(View);
