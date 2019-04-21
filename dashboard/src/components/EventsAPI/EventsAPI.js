import React, { Component } from "react";
import Header from "../common-components/Header/Header";
import { Route} from "react-router-dom";
import ListEventsContent from "./Content/ListEventsContent/ListEventsContent";
import AnnotateEventsContent from "./Content/AnnotateEventsContent/AnnotateEventsContent";


export const styles = theme => ({
  Main: {
    minHeight: '100%',
    display:"block",
  },
});

class EventsAPI extends Component {
  render() { 
    const { classes } = this.props;       
    const title = "Events Collection";  
       
    return (
      
      <div>
        <Header onDrawerToggle={this.props.onDrawerToggle} title={title} />
        <div className={classes.Main}>
          <main className={classes.mainContent}>                    
              <Route exact path="/eventsapi" render={(props) => (<ListEventsContent {...props} />)} />              
              <Route path="/eventsapi/annotatetweets/:eventId" render={(props) => (<AnnotateEventsContent {...props} />)} />                            
          </main>
        </div>
      </div>
    );
  }
}

export default EventsAPI;
