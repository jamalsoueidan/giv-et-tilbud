import React from "react";
import { ListItem } from "@material-ui/core";
import { Link } from "react-router5";

export default props => {
  const linkProps = {};
  if (props.routeName) {
    linkProps.component = Link;
    linkProps.routeName = props.routeName;
    linkProps.routeParams = props.routeParams;
  }

  return (
    <ListItem
      button
      selected={props.selected}
      onClick={props.onClick}
      {...linkProps}
    >
      {props.children}
    </ListItem>
  );
};
