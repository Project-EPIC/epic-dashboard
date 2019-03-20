import React, { Component } from "react";
import Dashboard from "./views/Dashboard/Dashboard";
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
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
