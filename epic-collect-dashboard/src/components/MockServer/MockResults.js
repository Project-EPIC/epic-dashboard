import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDb } from '../../actions/postActions';

class Posts extends Component {
  
  componentDidMount() {
    this.props.getDb();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      this.props.posts.unshift(nextProps.newPost);
    }
  }

  render() {
    // const people = this.props.people.map(person => (
    //   <div key={person.id}>
    //     <h3>{person.id}</h3>
    //     <p>{person.name}</p>
    //   </div>
    // ));
    const people = this.props.people;
    console.log(people);
    return (
      <div>
        <h1>Posts</h1>        
      </div>
    );
  }
}

Posts.propTypes = {
  getDb: PropTypes.func.isRequired,
  people: PropTypes.object  
};

const mapStateToProps = state => ({
  people: state.people  
});

export default connect(mapStateToProps, { getDb })(Posts);
