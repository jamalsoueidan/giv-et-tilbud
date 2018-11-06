import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as R from "ramda";
import {
  actions as DataActions,
  selectors as DataSelectors
} from "../../../store/data";

const styles = theme => ({
  root: {
    backgroundColor: "#e8f0f5"
  },
  button: {
    backgroundColor: "#FFF",
    color: "#000",
    width: "100%",
    "&:hover": {
      backgroundColor: "#e6e5e5",
      borderColor: "#333"
    },
    "&:active": {
      backgroundColor: "#e6e5e5",
      borderColor: "#333"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)"
    }
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

class SelectWorkshopDropdown extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = evt => {
    this.setState({ anchorEl: null });
    const target = evt.currentTarget;
    const id = target.dataset.id;
    if (!R.isNil(id)) {
      const { workshops, updateData } = this.props;
      const selectedWorkshop = workshops.find(w => w._id === id);
      updateData({ selectedWorkshopId: selectedWorkshop._id });
    }
  };

  render() {
    const { classes, workshops, selectedWorkshop } = this.props;
    const { anchorEl } = this.state;

    return (
      <Paper className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Button
              aria-owns={anchorEl ? "simple-menu" : undefined}
              aria-haspopup="true"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.handleClick}
            >
              Skift værksted
              <ArrowDropDownIcon className={classes.rightIcon}>
                send
              </ArrowDropDownIcon>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              {workshops &&
                workshops.map(workshop => (
                  <MenuItem
                    key={workshop._id}
                    onClick={this.handleClose}
                    data-id={workshop._id}
                  >
                    {workshop.name}, {workshop.address}
                  </MenuItem>
                ))}
            </Menu>
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom align="center">
              {selectedWorkshop.name}
            </Typography>
            <Typography gutterBottom align="center">
              {selectedWorkshop.address}
            </Typography>
            <Typography gutterBottom align="center">
              {selectedWorkshop.zip} {selectedWorkshop.city}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default connect(
  state => ({
    workshops: state.user.workshops,
    selectedWorkshop: DataSelectors.getSelectedWorkshop(state),
    route: state.router.route
  }),
  {
    updateData: DataActions.updateData
  }
)(withStyles(styles)(SelectWorkshopDropdown));
