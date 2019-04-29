import React, { Component } from "react";
import { Route} from "react-router-dom";
import ListAlertsContent from "./Content/ListAlertsContent/ListAlertsContent";


export const styles = theme => ({
  Main: {
    minHeight: '100%',
    display:"block",
  },
});



class EventsAPI extends Component {

  render() {       
    const title = "NWS Active Alerts";  
    const {classes, onDrawerToggle}  = this.props; 
    return (
      
      <div>              
          <Route exact path="/alerts/" render={(props) => (<ListAlertsContent {...props} title={title} classes={classes} onDrawerToggle={onDrawerToggle} />)} />              
          {/* <Route path="/events/:eventId/" render={(props) => (<DetailEventContent {...props} title={title} classes={classes} onDrawerToggle={onDrawerToggle} />)} />                             */}
      </div>
    );
  }
}

export default EventsAPI;
