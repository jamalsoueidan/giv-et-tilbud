import React from "react";
import ListItem from "../list_item";
import { ListItemText } from "@material-ui/core";

export default props => {
  if (!props.routeName) {
    throw new Error("Remember routeName for PanelListItem");
  }
  return (
    <ListItem
      routeName={props.routeName}
      routeParams={props.routeParams}
      selected={props.selected}
    >
      <ListItemText primary={props.primary} secondary={props.secondary} />
    </ListItem>
  );
};
