import React from "react";
import { withStyles } from "@material-ui/core";
import { PanelListItem } from "components";

const styles = theme => ({});

class Workshop extends React.Component {
  render() {
    const { workshop } = this.props;

    return (
      <PanelListItem
        primary={workshop.name}
        secondary={`${workshop.zip} ${workshop.city}`}
        routeName="profile.workshops.view"
        routeParams={{ id: workshop._id }}
      />
    );
  }
}

export default withStyles(styles)(Workshop);
