import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Typography, Button, Grid } from "@material-ui/core";
import { SaveIcon, CancelIcon } from "../../components/icons";

const styles = theme => ({
  textField: {
    flex: 1
  }
});

class Send extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography component="h2" variant="h4" gutterBottom>
          Send offer
        </Typography>
        <form className={classes.form} noValidate autoComplete="off">
          <Grid container>
            <TextField
              required
              id="message"
              label="Besked"
              multiline
              className={classes.textField}
              rows="10"
              variant="filled"
            />
          </Grid>
          <Grid container>
            <TextField
              required
              id="price"
              label="Pris"
              type="number"
              margin="normal"
              variant="filled"
            />
          </Grid>
          <Grid container spacing={8}>
            <Grid item>
              <Button
                variant="contained"
                size="small"
                className={classes.button}
              >
                <CancelIcon
                  className={classNames(classes.leftIcon, classes.iconSmall)}
                />
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="small"
                className={classes.button}
              >
                <SaveIcon
                  className={classNames(classes.leftIcon, classes.iconSmall)}
                />
                Send
              </Button>
            </Grid>
          </Grid>
        </form>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Send);
