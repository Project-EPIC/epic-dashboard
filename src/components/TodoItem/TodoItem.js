import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class TodoItem extends Component {
  render() {
    return (
      <div>
        <p>{this.props.todo.title}</p>
      </div>
    )
  }
}

// This is a sanity check for the code.
TodoItem.protoTypes = {
    todo: PropTypes.object.isRequired
  }

export default TodoItem
