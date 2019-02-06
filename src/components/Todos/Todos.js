import React, { Component } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import PropTypes from 'prop-types';

class Todos extends Component {
  render() {    
    return this.props.todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo}/>
        ));
  }
}

// This is a sanity check for the code.
Todos.PropTypes = {
  todos: PropTypes.array.isRequired
}

export default Todos;
