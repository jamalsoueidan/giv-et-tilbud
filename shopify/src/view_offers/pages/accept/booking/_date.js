import React, { Component } from "react";
import moment from "moment";
import { DatetimePicker } from "rc-datetime-picker";
import "rc-datetime-picker/dist/picker.css";
import "./_date.sass";

class Date extends Component {
  constructor() {
    super();
    this.state = {
      moment: moment()
    };
  }

  handleChange = moment => {
    this.setState({
      moment
    });
  };

  render() {
    return (
      <div className="date">
        <h4>Hvilken dag ønsker du din enhed bliver lavet?</h4>
        <DatetimePicker
          moment={this.state.moment}
          onChange={this.handleChange}
          minDate={moment()}
          weeks={["Søn", "Man", "Tirs", "Ons", "Tors", "Fre", "Lør"]}
          months={[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Maj",
            "Juni",
            "Juli",
            "Aug",
            "Sept",
            "Okt",
            "Nov",
            "Dec"
          ]}
          showTimePicker={false}
        />
        <h4>Hvornår ønsker du at aflevere enheden?</h4>
        <select>
          <option value="Morgen (08:00 - 10:00)">Morgen (08:00 - 10:00)</option>
          <option value="Formiddag (10:00 - 12:00)">
            Formiddag (10:00 - 12:00)
          </option>
          <option value="Eftermiddag (12:00 - 17:00)">
            Eftermiddag (12:00 - 17:00)
          </option>
          <option value="Hele dagen (08:00 - 17:00)">
            Hele dagen (08:00 - 17:00)
          </option>
        </select>
        <button type="submit" className="button">
          Forespørg tid
        </button>
        <small>
          Værkstedet vil så vidt muligt imødekomme dit ønske og give dig svar
          hurgtigst muligt
        </small>
      </div>
    );
  }
}

export default Date;
