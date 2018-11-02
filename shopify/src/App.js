import React, { Component } from "react";
import Zip from "./pages/zip";
import Devices from "./pages/devices";
import Models from "./pages/models";
import createHistory from "history/createBrowserHistory";

const history = createHistory();

class App extends Component {
  constructor(props) {
    super(props);

    //const location = window.location.search.substring(1);

    this.state = {
      page: "", //location.length > 0 ? location.split("=")[1] : "",
      data: {
        customer: {
          email: "",
          phone: "",
          city: "",
          zip: "",
          first_name: "",
          last_name: ""
        },
        properties: []
      }
    };
  }

  componentDidMount() {
    history.listen(this.onLocationChange);
  }

  onData = (data, gotoPage) => {
    this.setState({ data: data });
    history.push("?page=" + gotoPage);
  };

  onLocationChange = location => {
    const reloadPage = window.location.search.substring(1).split("=")[1];
    this.setState({
      page: reloadPage
    });
  };

  get renderPage() {
    const { page } = this.state;

    if (page === "devices") {
      return Devices;
    } else if (page === "models") {
      return Models;
    }

    return Zip;
  }

  render() {
    const props = { onData: this.onData, data: this.state.data, history };

    const Component = this.renderPage;
    return <Component {...props} />;
  }
}

export default App;
