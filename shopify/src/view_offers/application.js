import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import classnames from "classnames";
import { getOrder } from "./store";

class Application extends React.Component {
  componentDidMount() {
    this.props.getOrder({
      token: "6b4db750e95f242634a6cdcb26e30284",
      key: "19428877c1e232db65d1cec03e8b74be"
    });
  }
  render() {
    return (
      <React.Fragment>
        <h1 className="feature-title">Inside the Artist's Studio</h1>
        <div className="rte">
          <p>
            We have a spacious and well-equipped studio in downtown Toronto.
            Besides accommodating the needs of our 9-to-5 business, our studio
            is open to the larger creative community for printmaking
            workshops,&nbsp;events, and more!
          </p>
        </div>

        <div className="collection-products" />
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
