
import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import CreateEvent from "../../CreateEvent/CreateEvent";
import EventsTable from "../../ListEvents/EventsTable/EventsTable";


class ListEventsContent extends Component {
  render() {
  const { classes, match } = this.props;       
  return (      
        <div className={classes.contentWrapper}>             
            <div>
              <Paper className={classes.root}>  
                <CreateEvent/>
                <EventsTable match={match}/>                    
              </Paper>
            </div>            
        </div>          
  );
}
}

ListEventsContent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListEventsContent);
