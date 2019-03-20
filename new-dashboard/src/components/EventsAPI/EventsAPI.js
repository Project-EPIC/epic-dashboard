import React, { Component } from "react";
import Content from "./Content/Content";
import Header from "../common-components/Header/Header";

class EventsAPI extends Component {
  render() { 
    const { classes } = this.props;   
    return (
      <div>
        <Header onDrawerToggle={this.props.onDrawerToggle} onTabChange={this.props.onTabChange} tabValue={this.props.tabValue}/>
        <main className={classes.mainContent}>
          <Content tabValue={this.props.tabValue}/>                     
        </main>
      </div>
    );
  }
}

export default EventsAPI;
