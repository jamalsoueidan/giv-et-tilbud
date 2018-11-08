import React from "react";
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
  bold: {
    fontWeight: "580"
  },
  lessImportant: {
    color: "#4c4c4c"
  }
});

class Navigation extends React.Component {
  state = {
    open: true
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  navigate = name => {
    const { mobile, click, navigate } = this.props;
    if (mobile) {
      click();
    }
    navigate(name);
  };

  render() {
    const { classes, open, click, route } = this.props;

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
          <ListItem
            button
            onClick={() => this.navigate("home")}
            selected={route.name === "home"}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText
              primary="Din forside"
              classes={{
                primary: classNames(classes.lessImportant)
              }}
            />
          </ListItem>
          <ListItem
            button
            onClick={() => this.navigate("profile")}
            selected={route.name === "profile"}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText
              primary="Din profil"
              classes={{
                primary: classNames(classes.lessImportant)
              }}
            />
          </ListItem>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText
              inset
              primary="Opgaver"
              classes={{
                primary: classNames(classes.important, classes.bold)
              }}
            />
            {this.state.open ? <AddIcon /> : <RemoveIcon />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                onClick={() => this.navigate("incoming")}
                selected={route.name === "incoming"}
              >
                <ListItemIcon>
                  <DraftsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  inset
                  secondary="Ny Opgaver"
                  classes={{
                    secondary: classes.important
                  }}
                />
              </ListItem>
            </List>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                onClick={() => this.navigate("outgoing")}
                selected={route.name === "outgoing"}
              >
                <ListItemIcon>
                  <MailIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  inset
                  secondary="Dine bud"
                  className={classes.lessImportant}
                />
              </ListItem>
            </List>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                onClick={() => this.navigate("finished")}
                selected={route.name === "finished"}
              >
                <ListItemIcon>
                  <DoneIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  inset
                  secondary="Afsluttede opgaver"
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
