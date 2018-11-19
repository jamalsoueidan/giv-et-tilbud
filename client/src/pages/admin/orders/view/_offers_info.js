import React from "react";
import { Link } from "react-router5";
import classnames from "classnames";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  withStyles,
  List,
  Typography,
  Chip,
  Button,
  ButtonBase,
  IconButton
} from "@material-ui/core";
import { Panel, FormatDate } from "components";

const styles = themes => ({
  offer: {
    display: "flex",
    padding: "11px 24px",
    borderBottom: "1px solid #ddd",
    position: "relative",
    "&:last-child": {
      borderBottom: "0"
    }
  },
  company: {
    display: "flex",
    flexDirection: "column",
    flex: "1 0 calc(25% - 24px)",
    borderRight: "1px solid #ddd",
    marginRight: "24px"
  },
  offerDetails: {
    flex: "1 0 75%"
  },
  actions: {
    position: "absolute",
    right: "4px",
    top: "4px"
  }
});

class OffersInfo extends React.Component {
  render() {
    const { order, classes } = this.props;
    return (
      <Panel title="Alle bud fra værksteder">
        <List>
          {order.offers &&
            order.offers.map(offer => (
              <div
                key={offer._id}
                className={classnames(classes.offer, {
                  [classes.accepted]: offer.accepted
                })}
              >
                <div className={classes.company}>
                  <ButtonBase
                    component={Link}
                    routeName={"admin.workshops.view"}
                    routeParams={{ id: offer.workshop._id }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      style={{ textAlign: "left", width: "100%" }}
                    >
                      {offer.workshop.name}
                    </Typography>
                  </ButtonBase>

                  <Typography variant="body1" gutterBottom>
                    {offer.workshop.address}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {offer.workshop.zip}
                    {offer.workshop.city}
                  </Typography>

                  <Typography variant="caption">
                    <FormatDate datetime={offer.created_at} />
                  </Typography>
                </div>
                <div className={classes.offerDetails}>
                  <Typography variant="body2" gutterBottom>
                    Besked:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {offer.properties.message}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Pris:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {offer.properties.price} dkk
                  </Typography>
                  {offer.accepted && (
                    <Chip color="primary" label="Accepteret!" />
                  )}
                </div>
                <div className={classes.actions}>
                  <IconButton className={classes.button} aria-label="Delete">
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            ))}
        </List>
      </Panel>
    );
  }
}

export default withStyles(styles)(OffersInfo);
