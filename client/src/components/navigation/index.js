import React from "react";
import { Link } from "react-router5";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

import {
  StarIcon,
  PersonIcon,
  DraftsIcon,
  MailIcon,
  MenuIcon,
  HomeIcon,
  DoneIcon,
  AddIcon,
  RemoveIcon
} from "../icons";

const styles = theme => ({
  drawerPaper: {
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      zIndex: 10000
    },
    [theme.breakpoints.up("sm")]: {
      position: "relative"
    },
    overflowX: "hidden",
    whiteSpace: "nowrap",
    width: 240,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: "0px"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      padding: "0 12px"
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0 6px"
    },
    ...theme.mixins.toolbar
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  important: {
    color: "#262626"
  },
  lessImportant: {
    color: "#989898"
  }
});

class Navigation extends React.Component {
  state = {
    open: true
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes, open, click } = this.props;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !open && classes.drawerPaperClose
          )
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={click}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" color="inherit" noWrap>
            Application
          </Typography>
        </div>
        <Divider />
        <List>
          <ListItem button component={Link} routeName="home">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Din forside" />
          </ListItem>
          <ListItem button component={Link} routeName="profile">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Din profil" />
          </ListItem>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText inset primary="Opgaver" />
            {this.state.open ? <AddIcon /> : <RemoveIcon />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                component={Link}
                routeName="incoming"
              >
                <ListItemIcon>
                  <DraftsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  inset
                  primary="Ny Opgaver"
                  className={classes.important}
                />
              </ListItem>
            </List>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                component={Link}
                routeName="outgoing"
              >
                <ListItemIcon>
                  <MailIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  inset
                  primary="Dine bud"
                  className={classes.lessImportant}
                />
              </ListItem>
            </List>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                component={Link}
                routeName="finished"
              >
                <ListItemIcon>
                  <DoneIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  inset
                  primary="Afsluttede opgaver"
                  className={classes.lessImportant}
                />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Drawer>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Navigation);
