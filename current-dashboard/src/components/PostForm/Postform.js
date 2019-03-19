 import React, { Component } from 'react'
 import { connect } from 'react-redux';
 import PropTypes from 'prop-types';
 import { createPost } from '../../actions/postActions';
class Postform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        };
    }
    onChange = (e) => {
        this.setState(
           { [e.target.name]: e.target.value }
        );
    }
    onSubmit = (e) => {
        e.preventDefault();
        
        const post = {
            title: this.state.title,
            body: this.state.body
        }

        this.props.createPost(post);
    }

    render() {
        return (
            <div>
                <h1>Add Post</h1>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label> Title: </label><br/>
                        <input type="text" name="title" onChange={this.onChange} value={this.state.title}/>
                    </div>
                    <div>
                        <label> Body: </label><br/>
                        <textarea type="text" name="body" onChange={this.onChange} value={this.state.body}/>
                    </div>
                    <button type="submit">Submit</button>                    
                </form>
            </div>
        )
    }
}
Postform.propTypes = {
    createPost: PropTypes.func.isRequired
};

export default connect(null, { createPost })(Postform);
