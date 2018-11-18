import React from "react";
import { DeviceFilter, IssueFilter } from "components";

class Filters extends React.Component {
  navigate = params => {
    const { route } = this.props;
    this.props.navigate(route.name, { ...route.params, ...params });
  };

  handleDeviceChange = event => {
    this.navigate({ device: event.target.value });
  };

  handleIssueChange = event => {
    this.navigate({ issue: event.target.value });
  };

  render() {
    const { route } = this.props;

    return (
      <React.Fragment>
        <DeviceFilter
          value={route.params.device || ""}
          handleChange={this.handleDeviceChange}
        />
        <IssueFilter
          value={route.params.issue || ""}
          handleChange={this.handleIssueChange}
        />
      </React.Fragment>
    );
  }
}

export default Filters;
