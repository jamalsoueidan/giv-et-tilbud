import React from "react";
import Choose from "./_choose";
import { confirmAlert } from "react-confirm-alert";
import history from "../../core/history";
import "./index.sass";

class Accept extends React.Component {
  onAccept = () => {
    confirmAlert({
      title: "Acceptere dette tilbud?",
      message: "Du kan ikke skifte til et andet tilbud.",
      buttons: [
        {
          label: "Ja",
          onClick: () => alert("Click Yes")
        },
        {
          label: "Nej",
          onClick: () => window.history.back()
        }
      ]
    });
  };

  render() {
    const { order, offer } = this.props;

    return (
      <div className="accept">
        <ul className="progress-indicator">
          <li className="progress-indicator-step progress-indicator-step-active">
            Vælg tilbud
          </li>
          <li className="progress-indicator-step ">Bestil tid</li>
          <li className="progress-indicator-step ">Bekræftelse</li>
        </ul>
        <div className="content">
          <Choose order={order} offer={offer} onAccept={this.onAccept} />
        </div>
      </div>
    );
  }
}

export default Accept;
