import React from "react";
import { withStyles, Typography } from "@material-ui/core";
import { Panel } from "components";

const styles = theme => ({});

class Default extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <Panel title="Din profile side" padding>
        <Typography variant="subtitle1" gutterBottom>
          Velkommen til {user.email}, du har {user.workshops.length} værksteder
          i vores system.
        </Typography>
      </Panel>
    );
  }
}

export default withStyles(styles)(Default);
