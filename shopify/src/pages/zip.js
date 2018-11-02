import React from "react";
import { connect } from "react-redux";
import { toggleProperty } from "../store";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  zip: Yup.number("")
    .test(
      "len",
      "Postnummer er 4 cifre",
      val => val && val.toString().length === 4
    )
    .required("Zip is required!")
});

class Zip extends React.Component {
  render() {
    return (
      <div>
        <h1>Indtast din by</h1>
        <Formik
          initialValues={{ zip: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const { toggleProperty, next } = this.props;
            toggleProperty("zip", values.zip);
            next();
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="zip"
                name="zip"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.zip}
              />
              {errors.zip && touched.zip && errors.zip}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default connect(
  null,
  { toggleProperty }
)(Zip);
