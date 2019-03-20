import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import {
  MuiThemeProvider,  
  withStyles
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import EventsAPI from "../../components/EventsAPI/EventsAPI";

import { drawerWidth, theme, styles } from "./styles.js"


class Dashboard extends React.Component {
  state = {
    mobileOpen: false,
    tabValue: 0
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  onTabChange = (event, tabValue) => {
    this.setState({ tabValue });
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
            <Header onDrawerToggle={this.handleDrawerToggle} onTabChange={this.onTabChange} tabValue={this.state.tabValue}/>

            {/* React Router routes go here } */ }
            <main className={classes.mainContent}>
            { /* This is what is displayed in the main content */ }              
              <Route path="/eventsapi" render={(props) => <EventsAPI {...props} tabValue={this.state.tabValue} />}/>                       
            </main>
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