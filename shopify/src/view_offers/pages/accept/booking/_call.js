import React from "react";
import "./_call.sass";

class Call extends React.Component {
  state = {
    disabled: false
  };

  onClick = () => {
    const { onBooking } = this.props;
    const options = {
      booking: "phone",
      booking_at: new Date()
    };
    this.setState({
      disabled: true
    });
    onBooking(options);
  };

  render() {
    const offer = this.props.offer;
    return (
      <div className="call">
        <div className="call-number">{offer.workshop.phone}</div>
        <div className="call-opening">Hverdag 10:00 - 18:00</div>
        <div className="call-code">
          Oplys reference <strong>XXXX</strong> og evt. ønske om en lånetelefon
        </div>
        <div className="call-action">
          <button
            type="submit"
            className="button"
            onClick={this.onClick}
            disabled={this.state.disabled}
          >
            Tid aftalt
          </button>
        </div>
        <div className="call-support">Var det ikke muligt at aftale tid?</div>
      </div>
    );
  }
}

export default Call;
