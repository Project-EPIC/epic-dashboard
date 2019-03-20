import React, { Component } from "react";
import Content from "./CreateEvent/Content";
import TabContainer from "../TabContainer/TabContainer";


class EventsAPI extends Component {
  render() {    
    return (
      <div>
        <Content />
          {this.props.tabValue === 0 && <TabContainer>Item 111</TabContainer>}
          {this.props.tabValue === 1 && <TabContainer>Item 222</TabContainer>}                       
      </div>
    );
  }
}

export default EventsAPI;
