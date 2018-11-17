import React from "react";
import classnames from "classnames";
import { TextField, withStyles } from "@material-ui/core";

const styles = theme => ({
  textfield: {
    margin: theme.spacing.unit * 2,
    marginTop: 0,
    width: `calc(100% - ${theme.spacing.unit * 4}px)`
  }
});

const CustomTextField = props => {
  const newProps = {
    type: "string",
    margin: "normal",
    variant: "outlined",
    ...props,
    className: classnames(props.classes.textfield, props.className)
  };

  newProps.classes = undefined;
  return <TextField {...newProps} />;
};

export default withStyles(styles)(CustomTextField);
