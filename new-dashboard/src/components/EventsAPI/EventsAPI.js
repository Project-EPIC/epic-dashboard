import React, { Component } from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import EventsTable from "./ListEvents/EventsTable/EventsTable";
import CreateEvent from "./CreateEvent/CreateEvent";
import Header from "../common-components/Header/Header";
import { withStyles } from '@material-ui/core/styles';



export const styles = theme => ({
  Main: {
    minHeight: '100%',
    display:"block",
  },
});

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
