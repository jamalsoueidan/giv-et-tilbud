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
import DraftsIcon from "@material-ui/icons/Drafts";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";

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
  renderLink = itemProps => {
    console.log(itemProps);
    return <Link {...itemProps} />;
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
          <ListItem button component={this.renderLink} routeName="incoming">
            <ListItemIcon>
              <Badge badgeContent={4} color="primary">
                <DraftsIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Incoming" />
          </ListItem>
          <ListItem button component={this.renderLink} routeName="outgoing">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Outgoing" />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Navigation);
