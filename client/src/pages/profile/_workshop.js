import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import moment from "moment";

const styles = theme => ({
  card: {
    maxWidth: 400,
    marginBottom: theme.spacing.unit * 2
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  header: {
    paddingBottom: 0
  }
});

class RecipeReviewCard extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, data } = this.props;
    const { anchorEl } = this.state;

    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.header}
          action={
            <IconButton
              aria-owns={anchorEl ? "simple-menu" : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={data.name}
          subheader={`oprettet ${moment(data.created_at).format(
            "Do MMMM YYYY"
          )}`}
        />
        <CardContent>
          <Typography component="p">
            {data.address}
            <br />
            {data.zip} {data.city}
            <br />
            {data.phone}
            <br />
            {data.email}
            <br />
          </Typography>
        </CardContent>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Edit</MenuItem>
          <MenuItem onClick={this.handleClose}>Disable</MenuItem>
        </Menu>
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeReviewCard);
