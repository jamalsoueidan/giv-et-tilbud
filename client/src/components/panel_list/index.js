import React from "react";
import { List, ListSubheader } from "@material-ui/core";
import { Panel } from "components";

export default props => {
  const extraProps = {};
  if (props.title) {
    extraProps.subheader = (
      <ListSubheader component="div">{props.title}</ListSubheader>
    );
  }

  return (
    <Panel>
      <List component="nav" {...extraProps}>
        {props.children}
      </List>
    </Panel>
  );
};
