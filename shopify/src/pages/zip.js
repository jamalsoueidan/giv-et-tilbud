import React from "react";
import { connect } from "react-redux";
import { toggleProperty } from "../store";
import { Formik } from "formik";
import * as Yup from "yup";
import "./zip.sass";

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
      <div className="page-zip">
        <h1 className="page-title">Indtast din postnummer</h1>
        <p>
          Vi har over 100 værksteder i hele Danmark, som står klar til at
          reparere din telefon! Alle værksteder kan reparer din telefon eller
          bærbar hvor som helst og når som helst
        </p>
        <Formik
          initialValues={{ zip: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const { toggleProperty, next } = this.props;
            toggleProperty("zip", values.zip);
            next();
            setSubmitting(false);
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
              <div className="input-wrapper">
                <input
                  type="text"
                  name="zip"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.zip}
                  className="input-field"
                  placeholder="Indtast din postnummer..."
                />
              </div>
              {errors.zip && (
                <div className="error">
                  <div className="title">Fejl!</div>
                  <div className="message">Postnummer er forkert!</div>
                </div>
              )}
              <div className="input-wrapper">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button"
                >
                  Forsæt
                </button>
              </div>
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
