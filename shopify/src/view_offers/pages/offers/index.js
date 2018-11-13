import React from "react";
import Offer from "./_offer";
import Information from "./_information";
import history from "../../core/history";

class Offers extends React.Component {
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

  onClick = offer => {
    history.push(
      history.jsonToParams({
        ...history.getParams(),
        id: offer._id,
        page: "accept"
      })
    );
  };

  render() {
    const order = this.props.order;

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
              <Offer key={offer._id} data={offer} onClick={this.onClick} />
            ))}
            {this.renderRestOffers}
          </div>
        )}

        <p>Der tages forbehold for trykfejl</p>
      </React.Fragment>
    );
  }
}

export default Offers;
