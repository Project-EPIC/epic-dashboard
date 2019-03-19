import React, { Component } from "react";
import Paperbase from "./theme/Paperbase";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store';
// Roboto font required by material-ui
import "typeface-roboto";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Paperbase />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
