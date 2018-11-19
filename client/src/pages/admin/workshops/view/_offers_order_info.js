import React from "react";
import classnames from "classnames";
import { withStyles, List, Typography, Chip } from "@material-ui/core";
import { Panel, FormatDate, Pagination } from "components";

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
    flex: "1 0 calc(25% - 24px)",
    borderRight: "1px solid #ddd",
    marginRight: "24px"
  },
  offerDetails: {
    flex: "1 0 75%"
  }
});

class OffersOrderInfo extends React.Component {
  render() {
    const { payload, classes, route, navigate } = this.props;

    const workshop = payload.results;

    return (
      <Panel title={`Sidste 5 bud fra ${workshop.name}`}>
        {workshop.offers.map(offer => (
          <div
            key={offer._id}
            className={classnames(classes.offer, {
              [classes.accepted]: offer.accepted
            })}
          >
            <div className={classes.company}>
              <Typography variant="h6" gutterBottom>
                {offer.order.customer.first_name}
              </Typography>
              <Typography variant="body1">
                {offer.order.customer.address}
              </Typography>
              <Typography variant="body1">
                {offer.order.customer.zip} {offer.order.customer.city}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {offer.order.customer.phone}
              </Typography>
              <Typography variant="caption">
                <FormatDate datetime={offer.created_at} />
              </Typography>
            </div>
            <div className={classes.offerDetails}>
              <Typography variant="body2">Teleofon:</Typography>
              <Typography variant="body1" gutterBottom>
                {offer.order.properties.device} {offer.order.properties.model},{" "}
                {offer.order.properties.color}
              </Typography>
              <Typography variant="body2">Problem:</Typography>
              <Typography variant="body1" gutterBottom>
                {offer.order.properties.issue}
              </Typography>
              <Typography variant="body2">Besked:</Typography>
              <Typography variant="body1" gutterBottom>
                {offer.properties.message}
              </Typography>
              <Typography variant="body2">Pris:</Typography>
              <Typography variant="body1" gutterBottom>
                {offer.properties.price} dkk
              </Typography>
              {offer.accepted && <Chip color="primary" label="Accepteret!" />}
            </div>
          </div>
        ))}
        <Pagination
          count={payload.count}
          limit={payload.limit}
          page={payload.page}
          route={route}
          navigate={navigate}
        />
      </Panel>
    );
  }
}

export default withStyles(styles)(OffersOrderInfo);
