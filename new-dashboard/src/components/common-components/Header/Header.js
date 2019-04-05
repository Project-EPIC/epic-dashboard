import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import {
  IfFirebaseAuthed,
} from "@react-firebase/auth";


class  Header extends Component {

  render() {
    const { classes, onDrawerToggle, title, renderTabs } = this.props;
            

    return (
      <React.Fragment>
        <AppBar color="primary" position="sticky" elevation={0}>
          <Toolbar>
            <Grid container spacing={8} alignItems="center">
              <Hidden smUp>
                <Grid item>
                  <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={onDrawerToggle}
                    className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
              </Hidden>
              <Grid item xs />
              <IfFirebaseAuthed>
              {({ user }) =>  
              <Grid item>
                <Typography className={classes.link} >
                  {user.email}
                </Typography>
              </Grid>
              }
              </IfFirebaseAuthed>
              <IfFirebaseAuthed>
              {({ user }) => 
               <Grid item>
                <IconButton color="inherit" className={classes.iconButtonAvatar}>
                  <Avatar
                    className={classes.avatar}
                    src={user.photoURL}
                  />
                </IconButton>
              </Grid>
              }
            </IfFirebaseAuthed>
              
            </Grid>
          </Toolbar>
        </AppBar>
        <AppBar
          component="div"
          className={classes.secondaryBar}
          color="primary"
          position="static"
          elevation={0}
        >
          <Toolbar>
            <Grid container alignItems="center" spacing={8}>
              <Grid item xs>
                <Typography color="inherit" variant="h5">
                  { title }
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>        
          { renderTabs ?
            <AppBar
              component="div"
              className={classes.secondaryBar}
              color="primary"
              position="static"
              elevation={0}
            >          
              {            
                renderTabs()
              }               
            </AppBar>
            :
            null
          }
        
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);
