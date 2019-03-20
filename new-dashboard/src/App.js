import React, { Component } from "react";
import Dashboard from "./views/Dashboard/Dashboard";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store';
import "typeface-roboto"; // Roboto font required by material-ui

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
