import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  zip: Yup.number()
    .test("len", "Postnummer er 4 cifre", val => val.toString().length === 4)
    .required("Zip is required!")
});

class Zip extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(evt) {
    const { onData, data } = this.props;
    data.customer.zip = 12345;
    onData(data, "devices");
  }

  render() {
    return (
      <div>
        <h1>Indtast din by</h1>
        <Formik
          initialValues={{ zip: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            this.props.history.push("?page=devices");
            /*setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);*/
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

export default Zip;
