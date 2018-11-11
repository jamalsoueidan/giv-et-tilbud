import React from "react";
import { connect } from "react-redux";
import Offer from "./_offer";
import Information from "./_information";

import { getOrder } from "./store";
import "./application.sass";

//https://stackoverflow.com/questions/5448545/how-to-retrieve-get-parameters-from-javascript
const getQuery = param => {
  let found;
  window.location.search
    .substr(1)
    .split("&")
    .forEach(function(item) {
      if (param === item.split("=")[0]) {
        found = item.split("=")[1];
      }
    });
  return found;
};

class Application extends React.Component {
  componentDidMount() {
    this.props.getOrder({
      token: getQuery("token"),
      key: getQuery("key")
    });
  }

  get renderRestOffers() {
    const order = this.props.order;
    const left = 3 - order.offers.length + order.offers.length;
    const times = [];
    for (var i = order.offers.length; i < left; i++) {
      times.push(i);
    }

    return times.map(i => (
      <article key={i} className="offer">
        <div className="details" />
        <div className="properties">
          <div className="comingSoon">
            Afventer tilbud {i + 1} fra værksteder i området.
          </div>
        </div>
      </article>
    ));
  }

  render() {
    const { order } = this.props;

    if (!order.id) {
      return <div>Henter order...</div>;
    }

    return (
      <React.Fragment>
        <h1 className="feature-title">Din anmodning om 3 uforligtede tilbud</h1>
        <div className="feature-text">
          <p>Du vil modtage dine tilbud inden for 24 timer.</p>
        </div>

        <Information data={order} />

        {order.offers && (
          <div className="offers">
            {order.offers.map(offer => (
              <Offer key={offer._id} data={offer} />
            ))}
            {this.renderRestOffers}
          </div>
        )}

        <p>Der tages forbehold for trykfejl</p>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({ order: state.order }),
  {
    getOrder
  }
)(Application);
