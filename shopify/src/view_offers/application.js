import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import classnames from "classnames";
import Offer from "./_offer";
import { getOrder } from "./store";
import "./application.sass";

class Application extends React.Component {
  componentDidMount() {
    this.props.getOrder({
      token: "3750389b0522684681947ce5e96a52da",
      key: "a83081d05e7d24c23a81f1208af6dfaa"
    });
  }
  render() {
    const { order } = this.props;

    return (
      <React.Fragment>
        <h1 className="feature-title">Din anmodning om 3 uforligtede tilbud</h1>
        <div className="rte">
          <p>BNlah bla hbla hblah blah</p>
        </div>

        <div className="collection-offers">
          {order.offers &&
            order.offers.map(offer => <Offer key={offer._id} data={offer} />)}
        </div>
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
