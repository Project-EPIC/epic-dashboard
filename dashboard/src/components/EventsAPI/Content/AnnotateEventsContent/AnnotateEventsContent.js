
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import TweetAnnotationTable from "../../TweetAnnotation/TweetAnnotationTable/TweetAnnotationTable";


class AnnotateEventsContent extends Component {
  render() {
  const { classes, match } = this.props;   
  const { params } = match  
  return (      
        <div className={classes.contentWrapper}>             
          <TweetAnnotationTable annotateEvent={params.eventId}/>          
        </div>          
  );
}
}

AnnotateEventsContent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AnnotateEventsContent);
