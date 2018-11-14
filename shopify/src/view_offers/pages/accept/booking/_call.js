import React from "react";
import "./_call.sass";

const Call = () => {
  return (
    <div className="call">
      <div className="call-number">87 41 80 20</div>
      <div className="call-opening">Hverdag 10:00 - 18:00</div>
      <div className="call-code">
        Oplys reference <strong>XXXX</strong> og evt. ønske om en lånetelefon
      </div>
      <div className="call-action">
        <button type="submit" className="button">
          Tid aftalt
        </button>
      </div>
      <div className="call-support">
        <a href="#">Var det ikke muligt at aftale tid?</a>
      </div>
    </div>
  );
};

export default Call;
