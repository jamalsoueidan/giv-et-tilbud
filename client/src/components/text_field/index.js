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
  const { label, id, className, onChange, error, required, classes } = props;
  return (
    <TextField
      required={required}
      label={label}
      id={id}
      placeholder="Placeholder"
      type="string"
      margin="normal"
      variant="outlined"
      className={classnames(classes.textfield, className)}
      onChange={onChange}
      error={error}
    />
  );
};

export default withStyles(styles)(CustomTextField);
