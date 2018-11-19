import React from "react";
import { Panel, FormatDate } from "components";
import { Typography, Divider } from "@material-ui/core";

export default ({ workshop }) => {
  return (
    <Panel padding>
      <Typography variant="caption">
        Oprettet <FormatDate datetime={workshop.created_at} />
      </Typography>
      <Typography variant="h6" gutterBottom>
        {workshop.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {workshop.address}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {workshop.zip} {workshop.city}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {workshop.email}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {workshop.phone}
      </Typography>
    </Panel>
  );
};
