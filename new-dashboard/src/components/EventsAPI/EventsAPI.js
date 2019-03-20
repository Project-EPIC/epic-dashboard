import React, { Component } from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Content from "./Content/Content";
import Header from "../common-components/Header/Header";

class EventsAPI extends Component {
  state = {
    tabValue: "list-events"
  }
  
  onTabChange = (event, tabValue) => {
    this.setState({ tabValue });
  };

  headerTabs = () => {
    return (
      <Tabs value={this.state.tabValue} onChange={this.onTabChange} textColor="inherit">
        <Tab textColor="inherit" label="List Events"  value="list-events"/>          
        <Tab textColor="inherit" label="Create Events" value="create-events" />                                    
      </Tabs>  
    )
  }
  render() { 
    const { classes } = this.props;   
    const title = "Events API"
    return (
      <div>
        <Header onDrawerToggle={this.props.onDrawerToggle} title={title} renderTabs={this.headerTabs} />
        <main className={classes.mainContent}>
          <Content tabValue={this.state.tabValue}/>                     
        </main>
      </div>
    );
  }
}

export default EventsAPI;
