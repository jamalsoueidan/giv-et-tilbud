import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import classnames from "classnames";
import { toggleProperty } from "../store";
import "./booking.sass";

const TIME_OPEN = 10;
const TIME_CLOSE = 18;

const openingTime = datetime =>
  moment()
    .set("hour", TIME_OPEN)
    .set("minute", 0)
    .set("second", 0);

const closingTime = () =>
  moment()
    .set("minute", 0)
    .set("hour", TIME_CLOSE)
    .set("second", 0);

const fromToday = () => {
  // time already after closing time?
  if (moment().isAfter(closingTime())) {
    return moment()
      .add(1, "days")
      .set("hour", TIME_OPEN)
      .set("minute", 0)
      .set("second", 0);
  }

  if (moment().isBefore(openingTime())) {
    console.log("start of day");
    return openingTime();
  }

  return moment()
    .add(1, "hours")
    .set("minute", 0)
    .set("second", 0);
};

class PickDay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fromDate: fromToday()
    };
  }

  back = () => {
    const behind = moment(this.state.fromDate).isBefore(fromToday());
    if (!behind) {
      this.setState({
        fromDate: moment(this.state.fromDate).subtract(3, "days")
      });
    }
  };

  forward = () => {
    this.setState({
      fromDate: moment(this.state.fromDate).add(3, "days")
    });
  };

  onClick = date => evt => {
    evt.stopPropagation();
    this.props.onSubmit(date);
  };

  render() {
    const selectedDay = this.props.selectedDay;

    let dates = [this.state.fromDate];
    for (let i = 1; i < 3; i++) {
      const nextDay = moment(this.state.fromDate)
        .set("hour", TIME_OPEN)
        .add(i, "days");
      dates.push(nextDay);
    }

    return (
      <div className="pickDay">
        <h1 className="page-title">Vælge en dag</h1>
        <div className="days">
          <div onClick={this.back} className="back">
            Back
          </div>
          {dates.map(day => (
            <div
              key={day}
              className={classnames("day", {
                selected: moment(selectedDay).isSame(moment(day), "day")
              })}
              onClickCapture={this.onClick(moment(day)).bind(this)}
            >
              <div className="dayName">{moment(day).format("ddd")}</div>
              <div className="dayNumber">{moment(day).format("D")}</div>
            </div>
          ))}
          <div onClick={this.forward} className="forward">
            forward
          </div>
        </div>
      </div>
    );
  }
}

class PickTime extends React.Component {
  onClick = date => evt => {
    evt.stopPropagation();
    this.props.onSubmit(date);
  };

  checkTime(hour) {
    const timeNow = moment();
    return moment(hour).isBefore(timeNow);
  }

  render() {
    const selectedDay = this.props.selectedDay;
    const dayOfMonth = moment(selectedDay).date();

    const startDay = moment()
      .date(dayOfMonth)
      .set("hour", TIME_OPEN);
    const endToday = moment()
      .date(dayOfMonth)
      .set("hour", TIME_CLOSE);
    const hoursDuration =
      moment.duration(endToday.diff(startDay)).asHours() + 1;

    let hours = [];
    for (var i = 0; i < hoursDuration; i++) {
      hours.push(moment(startDay).add(i, "hours"));
    }

    return (
      <div className="page-picktime">
        <h1 className="page-title">Vælge en tid</h1>
        <ul className="hour">
          {hours.map(hour => {
            return (
              <li
                key={hour}
                className={classnames(
                  "time",
                  {
                    selected: moment(hour).isSame(moment(selectedDay), "hour")
                  },
                  {
                    unselectable: this.checkTime(hour)
                  }
                )}
                onClickCapture={this.onClick(moment(hour)).bind(this)}
              >
                {moment(hour).format("HH")}
                :00
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

class Book extends React.Component {
  onDay = day => {
    this.props.toggleProperty("datetime", day.format());
  };

  onTime = time => {
    this.props.toggleProperty("datetime", time.format());
  };

  onClick = evt => {
    evt.stopPropagation();
    const next = this.props.next;
    next();
  };

  render() {
    const datetime = this.props.datetime ? this.props.datetime.value : null;

    return (
      <div className="page-booking">
        <PickDay onSubmit={this.onDay} selectedDay={datetime} />
        <PickTime onSubmit={this.onTime} selectedDay={datetime} />
        <div className="input-wrapper">
          <button
            disabled={datetime ? false : true}
            onClick={this.onClick}
            className="button"
          >
            Confirm booking time
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    datetime: state.properties.find(p => p.name === "datetime")
  }),
  { toggleProperty }
)(Book);
