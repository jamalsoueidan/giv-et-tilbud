import React from "react";
import { Link } from "react-router5";
import classnames from "classnames";
import {
  withStyles,
  List,
  Typography,
  Chip,
  MenuItem
} from "@material-ui/core";
import { Panel, FormatDate, Menu } from "components";
import { StoreIcon } from "components/icons";

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
    flex: "1 0 calc(30% - 24px)",
    borderRight: "1px solid #ddd",
    marginRight: "24px"
  },
  offerDetails: {
    flex: "1 0 70%"
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
      <Panel title="Bud fra værksteder">
        {order.offers.length === 0 && (
          <Typography variant="body1" style={{ padding: 12 }}>
            Ingen bud fra værksteder, evt kontakt værksteder og bede dem om at
            sende et bud til kunden!
          </Typography>
        )}
        {order.offers && order.offers.length > 0 && (
          <List>
            {order.offers.map(offer => (
              <div
                key={offer._id}
                className={classnames(classes.offer, {
                  [classes.accepted]: offer.accepted
                })}
              >
                <div className={classes.company}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ textAlign: "left", width: "100%" }}
                  >
                    <StoreIcon style={{ fontSize: "30px" }} />{" "}
                    {offer.workshop.name}
                  </Typography>

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
                  <Menu>
                    <MenuItem
                      component={Link}
                      routeName="admin.workshops.view"
                      routeParams={{ id: offer.workshop_id }}
                    >
                      <StoreIcon
                        style={{ fontSize: "16px", marginRight: "5px" }}
                      />{" "}
                      Værksted side
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>Slet tilbud</MenuItem>
                  </Menu>
                </div>
              </div>
            ))}
          </List>
        )}
      </Panel>
    );
  }
}

export default withStyles(styles)(OffersInfo);
