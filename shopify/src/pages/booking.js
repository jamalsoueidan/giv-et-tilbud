import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import classnames from "classnames";
import { toggleProperty } from "../store";

window.moment = moment;

const TIME_OPEN = 10;
const TIME_CLOSE = 18;

const fromToday = () => {
  const endOfDay = moment()
    .set("minute", 0)
    .set("hour", TIME_CLOSE); // set atleast 1 hour before shop closes same day

  // time already after closing time?
  if (moment().isAfter(endOfDay)) {
    return moment()
      .add(1, "days")
      .set("hour", TIME_OPEN)
      .set("minute", 0)
      .set("second", 0);
  }

  // start counting from 10:00
  const startOfDay = moment()
    .set("hour", TIME_OPEN)
    .set("minute", 0)
    .set("second", 0);

  if (moment().isBefore(startOfDay)) {
    return startOfDay;
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
      fromDate: props.selectedDay || fromToday()
    };
  }

  back = () => {
    const behind = moment(this.state.fromDate).isBefore(fromToday());
    if (!behind) {
      this.setState({
        fromDate: moment(this.state.fromDate).subtract(5, "days")
      });
    }
  };

  forward = () => {
    this.setState({
      fromDate: moment(this.state.fromDate).add(5, "days")
    });
  };

  onClick = date => evt => {
    evt.stopPropagation();
    this.props.onSubmit(date);
  };

  render() {
    const selectedDay = this.props.selectedDay;

    let dates = [this.state.fromDate];
    for (let i = 1; i < 5; i++) {
      dates.push(moment(this.state.fromDate).add(i, "days"));
    }

    return (
      <div className="pickDay">
        <h1>Vælge en day</h1>
        <div onClick={this.back}>Back</div>
        {dates.map(day => (
          <div
            key={day}
            className={classnames("day", {
              selected: moment(selectedDay).isSame(moment(day), "day")
            })}
            onClickCapture={this.onClick(moment(day)).bind(this)}
          >
            <div className="dayName">{moment(day).format("ddd")}</div>
            <div className="dayNumber">{moment(day).format("DD")}</div>
          </div>
        ))}
        <div onClick={this.forward}>forward</div>
      </div>
    );
  }
}

class PickTime extends React.Component {
  onClick = date => evt => {
    evt.stopPropagation();
    this.props.onSubmit(date);
  };

  render() {
    const selectedDay = this.props.selectedDay;

    const startDay = moment(fromToday().date(moment(selectedDay).format("D")));
    const endToday = moment(startDay).set("hour", TIME_CLOSE);
    const hoursDuration =
      moment.duration(endToday.diff(startDay)).asHours() + 1;

    let hours = [];
    for (var i = 0; i < hoursDuration; i++) {
      hours.push(moment(startDay).add(i, "hours"));
    }

    return (
      <div className="pickDay">
        <h1>Vælge en tid {moment(selectedDay).format()}</h1>
        {hours.map(hour => {
          return (
            <div
              key={hour}
              className={classnames("time", {
                selected: moment(hour).isSame(moment(selectedDay), "hour")
              })}
              onClickCapture={this.onClick(moment(hour)).bind(this)}
            >
              {moment(hour).format("HH")}
              :00
            </div>
          );
        })}
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
      <React.Fragment>
        <PickDay onSubmit={this.onDay} selectedDay={datetime} />
        <PickTime onSubmit={this.onTime} selectedDay={datetime} />
        <button disabled={datetime ? false : true} onClick={this.onClick}>
          Confirm booking time
        </button>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    datetime: state.properties.find(p => p.name === "datetime")
  }),
  { toggleProperty }
)(Book);
