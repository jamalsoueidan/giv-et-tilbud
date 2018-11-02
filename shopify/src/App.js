import React, { Component } from "react";
import Zip from "./pages/zip";
import Devices from "./pages/devices";
import Models from "./pages/models";
import Colors from "./pages/colors";
import Issues from "./pages/issues";
import Breadcrumbs from "./components/breadcrumbs";
import createHistory from "history/createBrowserHistory";

const history = createHistory();

class App extends Component {
  state = {
    page: "zip"
  };

  componentDidMount() {
    history.listen(this.onLocationChange);
  }

  getNextPage = () => {
    const page = this.state.page;
    if (page === "zip") {
      return "devices";
    } else if (page === "devices") {
      return "models";
    } else if (page === "models") {
      return "colors";
    } else if (page === "colors") {
      return "issues";
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
    }

    return Zip;
  }

  render() {
    const props = { next: this.next };
    const Component = this.renderPage;

    return (
      <Breadcrumbs>
        <Component {...props} />
      </Breadcrumbs>
    );
  }
}

export default App;
