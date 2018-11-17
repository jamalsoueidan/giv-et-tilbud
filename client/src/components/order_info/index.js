import React from "react";
import { Panel, FormatDate } from "components";
import { Typography, Divider } from "@material-ui/core";

export default ({ order }) => {
  return (
    <Panel padding>
      <Typography variant="caption">
        Oprettet <FormatDate datetime={order.created_at} />
      </Typography>
      <Typography variant="h6" gutterBottom>
        {order.properties.device} {order.properties.model},{" "}
        {order.properties.color}
      </Typography>

      <Typography variant="body1" gutterBottom>
        {order.properties.issue}
      </Typography>
      <Divider style={{ margin: "16px 0" }} />
      <Typography variant="body2" gutterBottom>
        Kunde informationer:
      </Typography>
      <Typography variant="body1">{order.customer.first_name}</Typography>
      <Typography variant="body1" gutterBottom>
        {order.customer.zip} {order.customer.city}
      </Typography>
    </Panel>
  );
};
