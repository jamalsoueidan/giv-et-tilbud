import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router5";

const options = {
  color: "primary",
  variant: "text",
  component: Link
};

export default props => {
  const mergedProps = {
    ...options,
    ...props
  };

  return <Button {...mergedProps}>{props.children}</Button>;
};
