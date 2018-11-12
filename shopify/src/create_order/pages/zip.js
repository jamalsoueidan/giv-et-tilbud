import React from "react";
import { connect } from "react-redux";
import { toggleProperty, findAddress } from "../store";
import { Formik } from "formik";
import Autocomplete from "react-autocomplete";
import "./zip.sass";

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

class Zip extends React.Component {
  state = {
    value: ""
  };

  fetch = value => {
    this.props.findAddress(value);
  };

  componentDidMount() {
    this.debounceFindAddress = debounce(this.fetch, 250);
  }

  render() {
    return (
      <div className="page-zip">
        <h1 className="page-title">Indtast din adresse</h1>
        <p>
          Vi har over 100 værksteder i hele Danmark, som står klar til at
          reparere din telefon! Alle værksteder kan reparer din telefon eller
          bærbar hvor som helst og når som helst
        </p>
        <Formik
          initialValues={{ address: "" }}
          validate={values => {
            let errors = {};

            if (
              !this.props.address.find(item => item.tekst === this.state.value)
            ) {
              errors.address = "Ugyldig adresse";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const { toggleProperty, next } = this.props;
            const item = this.state.item;
            const address = item.forslagstekst.substring(
              0,
              item.forslagstekst.lastIndexOf(",")
            );
            toggleProperty("zip", item.data.postnr);
            toggleProperty("address", address);
            toggleProperty("city", item.data.postnrnavn);
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
                {errors.address && (
                  <div className="error">
                    <div className="title">Fejl!</div>
                    <div className="message">Adressen er ugyldig!</div>
                  </div>
                )}

                <Autocomplete
                  inputProps={{
                    name: "address",
                    type: "text",
                    className: "input-field",
                    placeholder: "Indtast din address..."
                  }}
                  wrapperProps={{
                    className: "wrapper"
                  }}
                  wrapperStyle={{
                    position: "relative",
                    display: "inline-block"
                  }}
                  value={this.state.value}
                  items={this.props.address}
                  getItemValue={item => item.tekst}
                  onSelect={(value, item) => this.setState({ value, item })}
                  onChange={(event, value) => {
                    this.setState({ value });
                    this.debounceFindAddress(value);
                  }}
                  renderMenu={children => (
                    <div className="menu">{children}</div>
                  )}
                  renderItem={(item, isHighlighted) => (
                    <div
                      className={`item ${
                        isHighlighted ? "item-highlighted" : ""
                      }`}
                      key={item.data.id}
                    >
                      {item.tekst}
                    </div>
                  )}
                />
              </div>
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
  state => ({
    address: state.address
  }),
  { toggleProperty, findAddress }
)(Zip);
