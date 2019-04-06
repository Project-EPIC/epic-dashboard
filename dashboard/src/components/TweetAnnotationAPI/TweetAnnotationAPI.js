import React, { Component } from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import EventsTable from "../EventsAPI/ListEvents/EventsTable/EventsTable";
import CreateEvent from "../EventsAPI/CreateEvent/CreateEvent";
import Header from "../common-components/Header/Header";
import { withStyles } from '@material-ui/core/styles';
import Content from "./Content/Content";


export const styles = theme => ({
  Main: {
    minHeight: '100%',
    display:"block",
  },
});


class TweetAnnotation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: "list-events"
    }
}

  onTabChange = (event, tabValue) => {
    this.setState({ tabValue });
  };

  headerTabs = () => {
    console.log(`headerTabs() called: ${this.state.tabValue}`);
    return (
      <Tabs value={this.state.tabValue} onChange={this.onTabChange} textColor="inherit">
        <Tab textColor="inherit" label="List Events"  value="list-events"/>          
        <Tab textColor="inherit" label="Create Events" value="create-events" />                                    
      </Tabs>  
    )
  }


  render() {
    const title = "Tweet Annotation";
    const { classes } = this.props;
    console.log('tweet anno api tabvalue is: ' + this.state.tabValue);
    return (      
      <div>
        <Header onDrawerToggle={this.props.onDrawerToggle} title={title} renderTabs={this.headerTabs}/>
        {/* <div className={classes.Main}>               */}
          <main className={classes.mainContent}>
            {/* <CreateEvent classes={classes}/> */}
            {/* <EventsTable/>                    */}
            <Content tabValue={this.state.tabValue}/> 
          </main>
        {/* </div> */}
      </div>
    );
  }
}

export default TweetAnnotation;
