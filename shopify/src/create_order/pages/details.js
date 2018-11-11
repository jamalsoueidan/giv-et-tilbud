import React from "react";
import { connect } from "react-redux";
import { toggleProperty } from "../store";
import { Formik } from "formik";
import * as Yup from "yup";
import classnames from "classnames";
import "./details.sass";

const validationSchema = Yup.object().shape({
  first_name: Yup.string("").required("first_name is required!"),
  last_name: Yup.string("").required("last_name is required!"),
  email: Yup.string("").required("email is required!"),
  phone: Yup.string("").required("phone is required!")
});

class Details extends React.Component {
  render() {
    return (
      <div className="page-details">
        <h1 className="page-title">...mangler kun din oplysninger!</h1>
        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            phone: ""
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const { toggleProperty, next } = this.props;
            toggleProperty("customer", values);
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
              <div className="input-wrapper">
                <label>Fornavn:</label>
                <input
                  type="text"
                  name="first_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.first_name}
                  placeholder="Dit fornavn..."
                  className={classnames("input-field", {
                    error: errors.first_name
                  })}
                />
              </div>
              <div className="input-wrapper">
                <label>Efternavn:</label>
                <input
                  type="text"
                  name="last_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.last_name}
                  placeholder="Dim efternavn..."
                  className={classnames("input-field", {
                    error: errors.last_name
                  })}
                />
              </div>
              <div className="input-wrapper">
                <label>Email:</label>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="your@email.com"
                  className={classnames("input-field", { error: errors.email })}
                />
              </div>
              <div className="input-wrapper">
                <label>Mobil nr:</label>
                <input
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  className={classnames("input-field", { error: errors.phone })}
                />
              </div>

              <div className="input-wrapper">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button"
                >
                  Bestil et tilbud!
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
)(Details);
