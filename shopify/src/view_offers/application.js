import React from "react";
import { connect } from "react-redux";
import { getOrder } from "./store";
import history from "./core/history";
import Offers from "./pages/offers";
import Accept from "./pages/accept";
import "./application.sass";

class Application extends React.Component {
  state = {
    page: history.getParams().page || "offers"
  };

  componentDidMount() {
    history.listen(this.onLocationChange);
    this.props.getOrder(history.getParams());
  }

  onLocationChange = () => {
    this.setState({
      page: history.getParams().page
    });
  };

  componentWillReceiveProps(nextProps, nextState) {
    const order = nextProps.order;
    const offer = order.offers && order.offers.find(offer => offer.accepted);
    if (offer) {
      history.push(
        history.jsonToParams({
          ...history.getParams(),
          id: offer._id,
          page: "accept"
        })
      );
    }
  }

  render() {
    const { order } = this.props;

    if (!order.id) {
      return <div>Henter order...</div>;
    }

    if (this.state.page === "accept") {
      const offer = order.offers.find(
        offer => offer._id === history.getParams().id
      );
      return <Accept order={order} offer={offer} />;
    }

    return <Offers order={order} />;
  }
}

export default connect(
  state => ({ order: state.order }),
  {
    getOrder
  }
)(Application);
