import React from "react";
import {
  withStyles,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography
} from "@material-ui/core";
import { Link } from "react-router5";
import { connect } from "react-redux";
import { actions as RouterActions } from "redux-router5";
import { InformationLayout, Panel, FormatDate } from "components";
import { actions as UsersActions } from "store/users";
import { StoreIcon, AccountIcon } from "components/icons";

const styles = theme => ({});

class Default extends React.Component {
  componentDidMount() {
    const { route, load } = this.props;
    if (this.shouldLoadUser) {
      load(route.params.id);
    }
  }

  componentDidUpdate() {
    const { route, load } = this.props;
    if (this.shouldLoadUser) {
      load(route.params.id);
    }
  }

  get shouldLoadUser() {
    const { user, route, load } = this.props;
    const user_id = route.params.id;
    return !user || user_id !== user._id;
  }

  get left() {
    return (
      <Panel>
        <List>
          <ListSubheader>Handlinger:</ListSubheader>
          <ListItem button>
            <ListItemText primary="Tilføj værksted" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Luk bruger" />
          </ListItem>
        </List>
      </Panel>
    );
  }

  get title() {
    const user = this.props.user;

    return (
      <React.Fragment>
        <AccountIcon /> {user.email} konto
      </React.Fragment>
    );
  }

  render() {
    const { user, route } = this.props;

    if (this.shouldLoadUser) return null;

    return (
      <InformationLayout title={this.title} information={this.left}>
        <Grid container direction="column" spacing={24}>
          <Grid item>
            <Panel padding>
              <Typography variant="caption">
                Oprettet <FormatDate datetime={user.created_at} />
              </Typography>
              <Typography variant="h6" gutterBottom>
                {user.email}
              </Typography>
              <Typography variant="body1">
                Shopify kunde nr: {user.customer_id}
              </Typography>
            </Panel>
          </Grid>
          <Grid item>
            <Panel title={`Alle værksteder der tilhører dette bruger`}>
              {user.workshops.length <= 0 && (
                <Typography variant="body1" style={{ padding: 12 }}>
                  Den konto har ingen værksteder tilføjet!
                </Typography>
              )}
              {user.workshops.length > 0 && (
                <List component="nav">
                  {user.workshops.map(workshop => (
                    <ListItem
                      key={workshop._id}
                      component={Link}
                      routeName="admin.workshop.view"
                      routeParams={{ id: workshop._id }}
                    >
                      <ListItemIcon>
                        <StoreIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${workshop.name}`}
                        secondary={`${workshop.zip} ${workshop.city}`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Panel>
          </Grid>
        </Grid>
      </InformationLayout>
    );
  }
}

export default connect(
  state => ({
    user: state.users.current
  }),
  {
    load: UsersActions.loadById,
    navigate: RouterActions.navigateTo
  }
)(withStyles(styles)(Default));
