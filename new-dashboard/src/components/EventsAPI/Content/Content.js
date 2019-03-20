import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import EventsTable from "../ListEvents/EventsTable/EventsTable";
import CreateEvent from "../CreateEvent/CreateEvent";


class Content extends Component {
  render() {
  const { classes } = this.props;  
  

  return (
      <div>
        {this.props.tabValue === "list-events" && <EventsTable/>}
        <div className={classes.contentWrapper}>  
          {this.props.tabValue === "create-events" && 
            (<Paper className={classes.paper}>  
            <CreateEvent classes={classes}/>
            </Paper>)
          }
        </div>
      </div>                  
    
  );
}
}

Content.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Content);


/*

*/
