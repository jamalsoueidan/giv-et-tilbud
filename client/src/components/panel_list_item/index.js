import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { Link } from "react-router5";

export default props => {
  if (!props.routeName) {
    throw new Error("Remember routeName for PanelListItem");
  }
  return (
    <ListItem
      button
      component={Link}
      routeName={props.routeName}
      routeParams={props.routeParams}
      selected={props.selected}
    >
      <ListItemText primary={props.primary} secondary={props.secondary} />
    </ListItem>
  );
};
