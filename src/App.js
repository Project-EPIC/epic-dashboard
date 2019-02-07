import React, { Component } from 'react';
import './App.css';
import Posts from './components/Posts/Posts'
import PostForm from './components/PostForm/PostForm'
class App extends Component {

  render() {
    return (
      <div className="App">
        <PostForm/>
        <Posts/>
      </div>
    );
  }
}

export default App;
