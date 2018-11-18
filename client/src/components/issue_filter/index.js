import React from "react";
import classnames from "classnames";
import {
  withStyles,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from "@material-ui/core";

const styles = theme => ({
  root: {
    display: "flex",
    padding: "24px"
  },
  formControl: {
    width: "100%"
  }
});

const IssueFilter = props => {
  return (
    <div className={classnames(props.classes.root, props.className)}>
      <FormControl component="fieldset" className={props.classes.formControl}>
        <FormLabel component="legend" focused={false}>
          Issue
        </FormLabel>
        <RadioGroup
          aria-label="issue"
          name="issue"
          value={props.value}
          onChange={props.handleChange}
        >
          <FormControlLabel value="" control={<Radio />} label="Alle" />
          <FormControlLabel
            value="broken screen"
            control={<Radio />}
            label="Skærm smadret"
          />
          <FormControlLabel
            value="water damage"
            control={<Radio />}
            label="Vandskade"
          />
          <FormControlLabel
            value="battery"
            control={<Radio />}
            label="Batteri"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default withStyles(styles)(IssueFilter);
