import React, { Component } from "react";
import Header from "../common-components/Header/Header";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Content from "./Content/Content";


export const styles = theme => ({
  Main: {
    minHeight: '100%',
    display:"block",
  },
});

class EventsAPI extends Component {
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
        <Tab textColor="inherit" label="List Events" value="list-events" />
        <Tab textColor="inherit" label="Annotate Tweets" value="annotate-tweet" />                                    
      </Tabs>  
    )
  }

  render() { 
    const { classes } = this.props;   
    const title = "Events Collection"
    console.log('Events API Tabvalue: ' + this.state.tabValue);    
    return (
      <div>
        <Header onDrawerToggle={this.props.onDrawerToggle} title={title} renderTabs={this.headerTabs}/>
        <div className={classes.Main}>
          <main className={classes.mainContent}>            
            <Content tabValue={this.state.tabValue}/>
          </main>
        </div>
      </div>
    );
  }
}

export default EventsAPI;
