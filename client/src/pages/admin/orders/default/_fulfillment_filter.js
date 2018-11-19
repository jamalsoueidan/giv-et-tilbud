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

const DeviceFilter = props => {
  return (
    <div className={classnames(props.classes.root, props.className)}>
      <FormControl component="fieldset" className={props.classes.formControl}>
        <FormLabel component="legend" focused={false}>
          Status opgave
        </FormLabel>
        <RadioGroup
          aria-label="fulfillment_status"
          name="fulfillment_status"
          value={props.value}
          onChange={props.handleChange}
        >
          <FormControlLabel value="" control={<Radio />} label="Begge" />
          <FormControlLabel
            value="null"
            control={<Radio />}
            label="Ikke gennemført af kunden"
          />
          <FormControlLabel
            value="fulfilled "
            control={<Radio />}
            label="Gennemført af kunden"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default withStyles(styles)(DeviceFilter);
