import React, { Component } from "react";
import createHistory from "history/createBrowserHistory";
import Zip from "./pages/zip";
import Devices from "./pages/devices";
import Models from "./pages/models";
import Colors from "./pages/colors";
import Issues from "./pages/issues";
import Breadcrumbs from "./components/breadcrumbs";
import Booking from "./pages/booking";
import Details from "./pages/details";
import Done from "./pages/done";

const history = createHistory();

class App extends Component {
  state = {
    page: "done"
  };

  componentDidMount() {
    history.listen(this.onLocationChange);
  }

  getNextPage = () => {
    const currentPage = this.state.page;
    if (currentPage === "zip") {
      return "devices";
    } else if (currentPage === "devices") {
      return "models";
    } else if (currentPage === "models") {
      return "colors";
    } else if (currentPage === "colors") {
      return "issues";
    } else if (currentPage === "issues") {
      return "booking";
    } else if (currentPage === "booking") {
      return "details";
    } else if (currentPage === "details") {
      return "done";
    }

    return "zip";
  };

  next = () => {
    const page = this.getNextPage();
    history.push("?page=" + page);
  };

  onLocationChange = location => {
    const reloadPage = window.location.search.substring(1).split("=")[1];
    this.setState({
      page: reloadPage
    });
  };

  get renderPage() {
    const page = this.state.page;
    if (page === "devices") {
      return Devices;
    } else if (page === "models") {
      return Models;
    } else if (page === "colors") {
      return Colors;
    } else if (page === "issues") {
      return Issues;
    } else if (page === "booking") {
      return Booking;
    } else if (page === "details") {
      return Details;
    } else if (page === "done") {
      return Done;
    }

    return Zip;
  }

  render() {
    const props = { next: this.next };
    const Component = this.renderPage;

    return (
      <Breadcrumbs page={this.state.page}>
        <Component {...props} />
      </Breadcrumbs>
    );
  }
}

export default App;
