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
          Enheder
        </FormLabel>
        <RadioGroup
          aria-label="device"
          name="device"
          value={props.value}
          onChange={props.handleChange}
        >
          <FormControlLabel value="" control={<Radio />} label="Alle" />
          <FormControlLabel value="iphone" control={<Radio />} label="iPhone" />
          <FormControlLabel value="iPad" control={<Radio />} label="iPad" />
          <FormControlLabel
            value="samsung"
            control={<Radio />}
            label="Samsung"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default withStyles(styles)(DeviceFilter);
