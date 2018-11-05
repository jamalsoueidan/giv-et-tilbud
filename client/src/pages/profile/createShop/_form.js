import React from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import { SaveIcon, CancelIcon } from "../../../components/icons";
import { Link } from "react-router5";

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
    <form onSubmit={handleSubmit}>
      {["name", "address", "zip", "city", "email", "phone"].map(field => (
        <Grid container key={field}>
          <TextField
            required
            label={field}
            id={field}
            type="string"
            margin="normal"
            variant="outlined"
            onChange={change.bind(null, field)}
            error={touched[field] && Boolean(errors[field])}
            style={{ width: "100%" }}
          />
        </Grid>
      ))}

      <Grid container spacing={8}>
        <Grid item>
          <Button
            variant="contained"
            size="small"
            routeName="profile"
            component={Link}
          >
            <CancelIcon />
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            size="small"
            disabled={isSubmitting}
          >
            <SaveIcon />
            Opret værksted
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
