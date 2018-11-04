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
import Badge from "@material-ui/core/Badge";
import { DraftsIcon, MailIcon, MenuIcon, HomeIcon, DoneIcon } from "../icons";

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
  }
});

class Navigation extends React.Component {
  render() {
    const { classes, open, click, stats } = this.props;

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
          <ListItem button component={Link} routeName="home">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Din profil" />
          </ListItem>
          <ListItem button component={Link} routeName="incoming">
            <ListItemIcon>
              <Badge badgeContent={stats.incomingOrdersCount} color="primary">
                <DraftsIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Nye opgaver" />
          </ListItem>
          <ListItem button component={Link} routeName="outgoing">
            <ListItemIcon>
              <Badge badgeContent={stats.outgoingOrdersCount} color="primary">
                <MailIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Dine bud" />
          </ListItem>
          <ListItem button component={Link} routeName="finished">
            <ListItemIcon>
              <DoneIcon />
            </ListItemIcon>
            <ListItemText primary="Afsluttede opgaver" />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Navigation);
