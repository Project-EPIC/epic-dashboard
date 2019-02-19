import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';

import Posts from './components/Posts/Posts';
import PostForm from './components/Postform/Postform';

import store from './store';
import MockResults from './components/MockServer/MockResults';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <MockResults />
          <PostForm />
          <hr />
          <Posts />
        </div>
      </Provider>
    );
  }
}

export default App;
