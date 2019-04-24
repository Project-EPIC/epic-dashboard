import React, { Component } from "react";
import { Route} from "react-router-dom";
import ListEventsContent from "./Content/ListEventsContent/ListEventsContent";
import DetailEventContent from "./Content/DetailEventContent/DetailEventContent";


export const styles = theme => ({
  Main: {
    minHeight: '100%',
    display:"block",
  },
});



class EventsAPI extends Component {

  render() {       
    const title = "Events Collection";  
    const {classes, onDrawerToggle}  = this.props; 
    return (
      
      <div>              
          <Route exact path="/events/" render={(props) => (<ListEventsContent {...props} title={title} classes={classes} onDrawerToggle={onDrawerToggle} />)} />              
          <Route path="/events/:eventId/" render={(props) => (<DetailEventContent {...props} title={title} classes={classes} onDrawerToggle={onDrawerToggle} />)} />                            
      </div>
    );
  }
}

export default EventsAPI;
