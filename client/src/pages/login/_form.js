import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

// https://dev.to/finallynero/react-form-using-formik-material-ui-and-yup-2e8h

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
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="email">Email Address</InputLabel>
        <Input
          id="email"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={change.bind(null, "email")}
          error={touched.email && Boolean(errors.email)}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          name="password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={change.bind(null, "password")}
          error={touched.password && Boolean(errors.password)}
        />
      </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={isSubmitting}
      >
        Sign in
      </Button>
    </form>
  );
};
