import React from "react";
import { DeviceFilter, IssueFilter } from "components";
import FulfillmentFilter from "./_fulfillment_filter";

class Filters extends React.Component {
  navigate = params => {
    const { route } = this.props;
    this.props.navigate(route.name, { ...route.params, ...params });
  };

  handleDeviceChange = event => {
    this.navigate({ device: event.target.value });
  };

  handleFulfillment = event => {
    this.navigate({ fulfillment_status: event.target.value });
  };

  handleIssueChange = event => {
    this.navigate({ issue: event.target.value });
  };

  render() {
    const { route } = this.props;

    return (
      <React.Fragment>
        <FulfillmentFilter
          value={route.params.fulfillment_status || ""}
          handleChange={this.handleFulfillment}
        />
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
