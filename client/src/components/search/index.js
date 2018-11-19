import React from "react";
import { withStyles, Input, Grid, Button } from "@material-ui/core";

const styles = theme => ({
  input: {
    width: "100%",
    height: "100%",
    paddingLeft: "4px",
    backgroundColor: "#fff",
    borderTopLeftRadius: "4px",
    borderBottomLeftRadius: "4px",
    borderBottom: "1px solid #ccc",
    "&:before": {
      border: 0
    }
  },
  button: {
    width: "100%",
    borderRadius: 0,
    borderTopRightRadius: "4px",
    borderBottomRightRadius: "4px",
    borderBottom: "1px solid #ccc",
    boxShadow: "none"
  }
});

class Search extends React.Component {
  state = {
    value: ""
  };

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  onClick = () => {
    const { onClick, navigate, route } = this.props;
    if (onClick) {
      onClick(this.state.value);
    }
    if (navigate) {
      navigate(route.name, {
        ...route.params,
        search: this.state.value
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={9}>
          <Input
            className={classes.input}
            placeholder="Søg..."
            value={this.state.value}
            onChange={this.onChange}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.onClick}
            className={classes.button}
          >
            Søg
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Search);
