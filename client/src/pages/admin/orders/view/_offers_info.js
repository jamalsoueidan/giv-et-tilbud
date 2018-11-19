import React from "react";
import { withStyles, List, Typography, Chip } from "@material-ui/core";
import { Panel } from "components";

const styles = themes => ({
  offer: {
    display: "flex",
    padding: "11px 24px",
    borderBottom: "1px solid #ddd",
    "&:last-child": {
      borderBottom: "0"
    }
  },
  company: {
    display: "flex",
    flexDirection: "column",
    flex: "1 0 30%"
  },
  offerDetails: {
    flex: "1 0 70%"
  }
});

class OffersInfo extends React.Component {
  render() {
    const { order, classes } = this.props;
    return (
      <Panel title="Alle bud">
        <List>
          {order.offers &&
            order.offers.map(offer => (
              <div key={offer._id} className={classes.offer}>
                <div className={classes.company}>
                  <Typography variant="h6" gutterBottom>
                    {offer.workshop.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {offer.workshop.address}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {offer.workshop.zip}
                    {offer.workshop.city}
                  </Typography>
                </div>
                <div className={classes.offerDetails}>
                  <Typography variant="h6" gutterBottom>
                    {offer.properties.message}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {offer.properties.price} dkk
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {offer.accepted && (
                      <Chip color="primary" label="Accepteret!" />
                    )}
                  </Typography>
                </div>
              </div>
            ))}
        </List>
      </Panel>
    );
  }
}

export default withStyles(styles)(OffersInfo);
