import React, { Component } from 'react';
import TagsInput from 'react-tagsinput'
// import 'react-tagsinput/react-tagsinput.css' 
import './style.css';

 // https://www.npmjs.com/package/react-tagsinput

class ReactTagInput extends Component {
      constructor() {
        super()
        this.state = {tags: []}
      }
     
      handleChange = (tags, changed, changedIndexes) => {
        this.setState({tags})
        this.props.updateTags(tags)
      }
     
      render() {
        return <TagsInput value={this.state.tags} onChange={this.handleChange} />
      }
};
 
export default ReactTagInput;