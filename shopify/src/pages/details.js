import React from "react";
import { connect } from "react-redux";
import { toggleProperty } from "../store";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  first_name: Yup.string("").required("first_name is required!"),
  last_name: Yup.string("").required("last_name is required!"),
  email: Yup.string("").required("email is required!"),
  phone: Yup.string("").required("phone is required!"),
  address: Yup.string("").required("address is required!")
});

class Details extends React.Component {
  render() {
    return (
      <div>
        <h1>Indtast din by</h1>
        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            address: ""
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
              first name:{" "}
              <input
                type="text"
                name="first_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.first_name}
              />
              {errors.first_name && touched.first_name && errors.first_name}
              <br />
              last name:{" "}
              <input
                type="text"
                name="last_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.last_name}
              />
              {errors.last_name && touched.last_name && errors.last_name}
              <br />
              address:{" "}
              <input
                type="text"
                name="address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
              />
              {errors.address && touched.address && errors.address}
              <br />
              email:{" "}
              <input
                type="text"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <br />
              phone number:{" "}
              <input
                type="text"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
              {errors.phone && touched.phone && errors.phone}
              <br />
              <button type="submit" disabled={isSubmitting}>
                Bestil et tilbud
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
)(Details);
