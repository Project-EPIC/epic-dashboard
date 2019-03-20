import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import {
  MuiThemeProvider,  
  withStyles
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import Sidebar from "../../components/common-components/Sidebar/Sidebar";
import EventsAPI from "../../components/EventsAPI/EventsAPI";
import TweetAnnotation from "../../components/TweetAnnotationAPI/TweetAnnotationAPI";
import { drawerWidth, theme, styles } from "./styles.js"


class Dashboard extends React.Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };



  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <nav className={classes.drawer}>
            <Hidden smUp implementation="js">
              { /*This is the side bar */}
              <Sidebar
                PaperProps={{ style: { width: drawerWidth } }}
                variant="temporary"
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
              />
            </Hidden>
            <Hidden xsDown implementation="css">
              <Sidebar PaperProps={{ style: { width: drawerWidth } }} />
            </Hidden>
          </nav>
          <div className={classes.appContent}>
            {/* React Router routes go here } */ }
            <Route path="/eventsapi" render={(props) => <EventsAPI {...props}  onDrawerToggle={this.handleDrawerToggle} classes={classes}/>}/>
            <Route path="/tweetannotation" render={(props) => <TweetAnnotation {...props} onDrawerToggle={this.handleDrawerToggle} classes={classes}/>}/>                                                           
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
