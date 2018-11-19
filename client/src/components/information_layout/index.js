import React from "react";
import { Grid } from "@material-ui/core";
import Title from "../title";

const InformationLayout = ({
  title,
  information,
  children,
  className,
  informationColumns,
  childrenColumns
}) => {
  return (
    <Title title={title} className={className}>
      <Grid container spacing={40}>
        <Grid item xs={12} sm={childrenColumns || 8}>
          {children}
        </Grid>
        <Grid item xs={12} sm={informationColumns || 4}>
          {information || ""}
        </Grid>
      </Grid>
    </Title>
  );
};

export default InformationLayout;
