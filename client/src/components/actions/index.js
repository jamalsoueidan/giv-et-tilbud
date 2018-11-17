import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";

export default props => {
  return (
    <List>
      <ListItem>
        <ListItemText primary="." />
        <ListItemSecondaryAction style={{ paddingRight: "8px" }}>
          {props.children}
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
};
