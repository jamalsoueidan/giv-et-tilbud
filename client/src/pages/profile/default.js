import React from "react";
import Workshop from "./_workshop";
import * as R from "ramda";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router5";

const styles = theme => ({});

class Default extends React.Component {
  get renderWorkshops() {
    const { user } = this.props;
    if (R.isEmpty(user.workshops)) {
      return <div>Du har stadig ikke oprettet værksteder på din profil</div>;
    } else {
      return user.workshops.map(workshop => (
        <Workshop key={workshop._id} data={workshop} />
      ));
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1>Din profile side</h1>
        {this.renderWorkshops}
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          component={Link}
          routeName="profile.create_shop"
        >
          Tilføj ny værksted
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Default);
