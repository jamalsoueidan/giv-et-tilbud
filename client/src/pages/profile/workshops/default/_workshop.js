import React from "react";
import { withStyles, ListItem, ListItemText } from "@material-ui/core";

const styles = theme => ({});

class Workshop extends React.Component {
  render() {
    const { workshop } = this.props;

    return (
      <ListItem button>
        <ListItemText
          primary={workshop.name}
          secondary={`${workshop.zip} ${workshop.city}`}
        />
      </ListItem>
    );
  }
}

export default withStyles(styles)(Workshop);
