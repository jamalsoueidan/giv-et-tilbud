import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { Link } from "react-router5";

export default props => {
  return (
    <ListItem
      button
      component={Link}
      routeName={props.routeName}
      selected={props.selected}
    >
      <ListItemText primary={props.primary} secondary={props.secondary} />
    </ListItem>
  );
};
