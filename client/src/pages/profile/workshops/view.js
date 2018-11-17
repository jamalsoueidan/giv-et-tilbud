import React from "react";
import { withStyles, Typography } from "@material-ui/core";
import { Panel } from "components";

const styles = theme => ({});

class View extends React.Component {
  render() {
    const { route, user } = this.props;
    const workshop = user.workshops.find(w => w._id === route.params.id);
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
