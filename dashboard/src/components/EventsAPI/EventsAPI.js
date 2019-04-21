import React, { Component } from "react";
import Header from "../common-components/Header/Header";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { Route, Switch} from "react-router-dom";
import ListEventsContent from "./ListEventsContent/ListEventsContent";
import AnnotateEventsContent from "./AnnotateEventsContent/AnnotateEventsContent";


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
    return (
      <Tabs value={this.state.tabValue} onChange={this.onTabChange} textColor="inherit">                         
        <Tab textColor="inherit" label="List Events" value="list-events" />
        <Tab textColor="inherit" label="Annotate Tweets" value="annotate-tweet" />                                    
      </Tabs>  
    )
  }

  render() { 
    const { classes, match } = this.props;       
    const title = "Events Collection";  
       
    return (
      
      <div>
        <Header onDrawerToggle={this.props.onDrawerToggle} title={title} />
        <div className={classes.Main}>
          <main className={classes.mainContent}>            
            {/* <Content match={match} tabValue={this.state.tabValue} onTabChange={this.onTabChange}/> */}          
              <Route exact path="/eventsapi" render={(props) => (<ListEventsContent {...props} />)} />              
              <Route path="/eventsapi/annotatetweets/:eventId" render={(props) => (<AnnotateEventsContent {...props} />)} />                            
          </main>
        </div>
      </div>
    );
  }
}

export default EventsAPI;
