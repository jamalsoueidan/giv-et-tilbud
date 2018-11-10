import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { actions as RouterActions } from "redux-router5";

const styles = theme => ({
  root: {
    backgroundColor: "#fff",
    marginTop: "10px"
  },
  filtering: {
    backgroundColor: "#e8f0f5",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    fontWeight: 300,
    padding: "12px 0"
  },
  formControl: {
    margin: "20px 30px"
  },
  group: {
    margin: "10px"
  }
});

const DeviceFilter = props => {
  return (
    <FormControl component="fieldset" className={props.classes.formControl}>
      <FormLabel component="legend" focused={false}>
        Device
      </FormLabel>
      <RadioGroup
        aria-label="device"
        name="device"
        className={props.classes.group}
        value={props.value}
        onChange={props.handleChange}
      >
        <FormControlLabel value="" control={<Radio />} label="Alle" />
        <FormControlLabel value="iphone" control={<Radio />} label="iPhone" />
        <FormControlLabel value="iPad" control={<Radio />} label="ipad" />
        <FormControlLabel value="samsung" control={<Radio />} label="Samsung" />
      </RadioGroup>
    </FormControl>
  );
};

const IssueFilter = props => {
  return (
    <FormControl component="fieldset" className={props.classes.formControl}>
      <FormLabel component="legend" focused={false}>
        Issue
      </FormLabel>
      <RadioGroup
        aria-label="issue"
        name="issue"
        className={props.classes.group}
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
        <FormControlLabel value="battery" control={<Radio />} label="Batteri" />
      </RadioGroup>
    </FormControl>
  );
};

class FilterOrders extends React.Component {
  navigate = params => {
    const route = this.props.route;
    this.props.navigate("incoming", { ...route.params, ...params });
  };

  handleDeviceChange = event => {
    this.navigate({ device: event.target.value });
  };

  handleIssueChange = event => {
    this.navigate({ issue: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={12} style={{ padding: "0 8px" }}>
            <Typography
              variant="subtitle1"
              gutterBottom
              align="center"
              className={classes.filtering}
            >
              FILTRER DINE RESULTATER
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <DeviceFilter
              classes={classes}
              value={this.props.route.params.device || ""}
              handleChange={this.handleDeviceChange}
            />
            <IssueFilter
              classes={classes}
              value={this.props.route.params.issue || ""}
              handleChange={this.handleIssueChange}
            />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default connect(
  state => ({
    route: state.router.route
  }),
  {
    navigate: RouterActions.navigateTo
  }
)(withStyles(styles)(FilterOrders));
