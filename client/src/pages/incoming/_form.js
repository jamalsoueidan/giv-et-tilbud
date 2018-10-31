import React from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import { SaveIcon, CancelIcon } from "../../components/icons";
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
      <Grid container>
        <TextField
          required
          id="message"
          label="Besked"
          multiline
          rows="10"
          variant="filled"
          onChange={change.bind(null, "message")}
          error={touched.message && Boolean(errors.message)}
        />
      </Grid>
      <Grid container>
        <TextField
          required
          id="price"
          label="Pris"
          type="number"
          margin="normal"
          variant="filled"
          onChange={change.bind(null, "price")}
          error={touched.price && Boolean(errors.price)}
        />
      </Grid>
      <Grid container spacing={8}>
        <Grid item>
          <Button
            variant="contained"
            size="small"
            routeName="incoming"
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
            Send
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
