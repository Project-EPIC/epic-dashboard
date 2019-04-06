import React, { Component } from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import EventsTable from "./ListEvents/EventsTable/EventsTable";
import CreateEvent from "./CreateEvent/CreateEvent";
import Header from "../common-components/Header/Header";
import { withStyles } from '@material-ui/core/styles';



export const styles = theme => ({
  // Main: {
  //   minHeight: '100%',
  //   display:"block",
  // },
});

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

export default withStyles(styles)(EventsAPI);
