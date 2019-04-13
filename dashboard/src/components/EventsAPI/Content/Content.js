
import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import TweetAnnotationTable from "../TweetAnnotation/TweetAnnotationTable/TweetAnnotationTable";
import CreateEvent from "../../EventsAPI/CreateEvent/CreateEvent";
import EventsTable from "../ListEvents/EventsTable/EventsTable";


class Content extends Component {
  render() {
  const { classes } = this.props;    
  return (      
        <div className={classes.contentWrapper}>             
          {this.props.tabValue === "annotate-tweet" && <TweetAnnotationTable/>}
          {this.props.tabValue === "list-events" && (
            <div>
              <Paper className={classes.root}>  
                <CreateEvent/>
                <EventsTable onTabChange={this.props.onTabChange}/>                    
              </Paper>
            </div>
            )}
        </div>          
  );
}
}

Content.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Content);
