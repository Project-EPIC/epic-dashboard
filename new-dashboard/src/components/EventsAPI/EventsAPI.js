import React, { Component } from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Content from "./Content/Content";
import Header from "../common-components/Header/Header";

class EventsAPI extends Component {
  renderTabs = () => {
    return (
      <Tabs value={this.props.tabValue} onChange={this.props.onTabChange} textColor="inherit">
        <Tab textColor="inherit" label="List Events" />          
        <Tab textColor="inherit" label="Create Events" />                                    
      </Tabs>  
    )
  }
  render() { 
    const { classes } = this.props;   
    const title = "Events API"
    return (
      <div>
        <Header onDrawerToggle={this.props.onDrawerToggle} onTabChange={this.props.onTabChange} tabValue={this.props.tabValue} title={title} renderTabs={this.renderTabs}/>
        <main className={classes.mainContent}>
          <Content tabValue={this.props.tabValue}/>                     
        </main>
      </div>
    );
  }
}

export default EventsAPI;
