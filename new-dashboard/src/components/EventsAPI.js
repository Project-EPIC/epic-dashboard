import React, { Component } from "react";
import Content from "../theme/Content";
import TabContainer from "../components/TabContainer/TabContainer";


class EventsAPI extends Component {
  render() {
    console.log(this.props.tabValue);
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
