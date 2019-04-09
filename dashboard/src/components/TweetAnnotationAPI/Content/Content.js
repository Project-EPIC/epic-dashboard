
import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import TweetAnnotationTable from "../TweetAnnotationTable/TweetAnnotationTable";
import CreateEvent from "../../EventsAPI/CreateEvent/CreateEvent";


class Content extends Component {
  render() {
  const { classes } = this.props;  
  console.log(this.props.tabValue)

  return (      
        <div className={classes.contentWrapper}>             
          {this.props.tabValue === "annotate-tweet" && <TweetAnnotationTable/>}
        </div>          
  );
}
}

Content.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Content);
