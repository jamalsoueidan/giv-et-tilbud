import React from "react";
import Workshop from "./default/_workshop";
import { withStyles } from "@material-ui/core/styles";
import { List, Divider } from "@material-ui/core";
import { Panel, Link, Actions } from "components";

const styles = theme => ({});

class Default extends React.Component {
  get renderWorkshops() {
    const { user } = this.props;
    if (!user.workshops || user.workshops.length === 0) {
      return <div>Du har stadig ikke oprettet værksteder på din profil</div>;
    } else {
      return user.workshops.map(workshop => (
        <Workshop key={workshop._id} workshop={workshop} />
      ));
    }
  }

  render() {
    return (
      <Panel title="Værksteder">
        <List component="nav">{this.renderWorkshops}</List>
        <Divider />
        <Actions>
          <Link
            variant="contained"
            color="primary"
            routeName="profile.workshops.create"
          >
            Tilføj ny værksted
          </Link>
        </Actions>
      </Panel>
    );
  }
}

export default withStyles(styles)(Default);
