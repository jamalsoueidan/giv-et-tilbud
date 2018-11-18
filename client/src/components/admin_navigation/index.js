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

import { StarIcon, PersonIcon, MenuIcon, HomeIcon } from "../icons";

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
            onClick={() => this.navigate("admin")}
            selected={route.name === "admin"}
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
            onClick={() => this.navigate("admin.orders")}
            selected={route.name === "admin.orders"}
          >
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
          </ListItem>
          <ListItem
            button
            onClick={() => this.navigate("admin.users")}
            selected={route.name === "admin.users"}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText
              primary="Brugere"
              classes={{
                primary: classNames(classes.lessImportant)
              }}
            />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Navigation);
