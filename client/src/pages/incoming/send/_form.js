import React from "react";
import { Button, Grid, Divider } from "@material-ui/core";
import { SaveIcon, CancelIcon } from "components/icons";
import { Actions, Link, TextField } from "components";

export default props => {
  const {
    errors,
    handleSubmit,
    touched,
    handleChange,
    setFieldTouched,
    isSubmitting
  } = props;

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
      <Grid container direction="column">
        {[
          {
            label: "Besked",
            id: "message",
            multiline: true,
            helperText:
              "Kunden vil læse din besked inden han acceptere din tilbud!",
            rows: 10,
            type: "text"
          },
          {
            label: "Pris",
            helperText: "Den pris du ønsker for reperation",
            id: "price",
            type: "number"
          }
        ].map(field => (
          <Grid item key={field.id}>
            <TextField
              {...field}
              required
              onChange={change.bind(null, field.id)}
              error={touched[field.id] && Boolean(errors[field.id])}
            />
          </Grid>
        ))}
      </Grid>
      <Divider />
      <Actions>
        <Link size="small" routeName="incoming" style={{ marginRight: "8px" }}>
          <CancelIcon /> Cancel
        </Link>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          disabled={isSubmitting}
        >
          <SaveIcon />
          Send et tilbud
        </Button>
      </Actions>
    </form>
  );
};
