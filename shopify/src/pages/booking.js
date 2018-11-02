import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import classnames from "classnames";
import { toggleProperty } from "../store";

window.moment = moment;

class PickDay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fromDate: props.selectedDay || this.fromToday
    };
  }

  get fromToday() {
    const endOfDay = moment()
      .set("minute", "00")
      .set("hour", "20");

    if (moment().isAfter(endOfDay)) {
      return moment().add(1, "days");
    }

    return moment();
  }

  back = () => {
    const behind = moment(this.state.fromDate).isBefore(this.fromToday);
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

class Book extends React.Component {
  onDay = day => {
    this.props.toggleProperty("datetime", day.format());
  };

  onTime = time => {};

  render() {
    const datetime = this.props.datetime ? this.props.datetime.value : null;

    return (
      <React.Fragment>
        <PickDay onSubmit={this.onDay} selectedDay={datetime} />
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
