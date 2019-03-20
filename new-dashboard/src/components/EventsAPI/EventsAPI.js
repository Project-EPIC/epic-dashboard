import React, { Component } from "react";
import Content from "./Content/Content";


class EventsAPI extends Component {
  render() {    
    return (
      <div>
        <Content tabValue={this.props.tabValue}/>                     
      </div>
    );
  }
}

export default EventsAPI;
