import React, { Component } from "react";
import Paperbase from "./theme/Paperbase";
import { BrowserRouter } from "react-router-dom";

// Roboto font required by material-ui
import "typeface-roboto";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Paperbase />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
