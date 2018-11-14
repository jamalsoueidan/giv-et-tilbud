import React, { Component } from "react";
import moment from "moment";
import { DatetimePicker } from "rc-datetime-picker";
import "rc-datetime-picker/dist/picker.css";
import "./_date.sass";

class Date extends Component {
  state = {
    date: moment(),
    time: 18,
    disabled: false
  };

  handleChange = moment => {
    this.setState({
      date: moment
    });
  };

  selectChange = evt => {
    this.setState({ time: Number(evt.target.value) });
  };

  onClick = () => {
    const { date, time } = this.state;
    const booking_at = moment(date)
      .set("minute", 0)
      .set("hour", time)
      .set("second", 0);

    this.setState({
      disabled: true
    });

    this.props.onBooking({
      booking: "datetime",
      booking_at: booking_at
    });
  };

  render() {
    return (
      <div className="date">
        <h4>Hvilken dag ønsker du din enhed bliver lavet?</h4>
        <DatetimePicker
          moment={this.state.date}
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
        <select onChange={this.selectChange} defaultValue={18}>
          <option value="10">Formiddag (10:00 - 12:00)</option>
          <option value="12">Middag (12:00 - 15:00)</option>
          <option value="15">Eftermiddag (15:00 - 18:00)</option>
          <option value="18">Hele dagen (10:00 - 18:00)</option>
        </select>
        <button
          type="submit"
          className="button"
          onClick={this.onClick}
          disabled={this.state.disabled}
        >
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
