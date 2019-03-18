import React, { Component } from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">          
        <Provider store={store}>

        </Provider>
        </header>
      </div>
    );
  }
}

export default App;
