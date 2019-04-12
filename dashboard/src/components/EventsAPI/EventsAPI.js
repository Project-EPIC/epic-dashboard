import React, { Component } from "react";
import EventsTable from "./ListEvents/EventsTable/EventsTable";
import CreateEvent from "./CreateEvent/CreateEvent";
import Header from "../common-components/Header/Header";



class EventsAPI extends Component {
  render() { 
    const { classes } = this.props;   
    const title = "Events Collection"    
    return (
      <div className={classes.Main}>
        <Header onDrawerToggle={this.props.onDrawerToggle} title={title} />
        <main className={classes.mainContent}>
          <CreateEvent classes={classes}/>
          <EventsTable/>                   
        </main>
      </div>
    );
  }
}

export default EventsAPI;
