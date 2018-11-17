import React from "react";
import { Button, Grid, Divider, withStyles } from "@material-ui/core";
import { SaveIcon, CancelIcon } from "components/icons";
import { Actions, Link, TextField } from "components";

const styles = theme => ({});

class Form extends React.Component {
  render() {
    const {
      errors,
      handleSubmit,
      touched,
      handleChange,
      setFieldTouched,
      isSubmitting
    } = this.props;

    const change = (name, e) => {
      e.persist();
      handleChange(e);
      setFieldTouched(name, true, false);
    };

    return (
      <form onSubmit={handleSubmit}>
        <Grid container direction="column">
          {[
            { label: "Navn", id: "name" },
            { label: "Adresse", id: "address" },
            { label: "By", id: "city" },
            { label: "Postnummer", id: "zip" },
            { label: "Email", id: "email" },
            { label: "Telefonnr", id: "phone" }
          ].map(field => (
            <Grid item key={field.id}>
              <TextField
                required
                label={field.label}
                id={field.id}
                onChange={change.bind(null, field.id)}
                error={touched[field.id] && Boolean(errors[field.id])}
              />
            </Grid>
          ))}
        </Grid>

        <Divider />
        <Actions>
          <Link
            size="small"
            routeName="profile.workshops"
            style={{ marginRight: "8px" }}
          >
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
            Opret værksted
          </Button>
        </Actions>
      </form>
    );
  }
}

export default withStyles(styles)(Form);
