import React, { Component } from 'react'
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
export default class CreateEvent extends Component {
  render() {
    const { classes } = this.props;  
    return (              
        <AppBar
            className={classes.searchBar}
            position="static"
            color="default"
            elevation={0}
            >
            <Toolbar>
                <Grid container spacing={16} alignItems="center">
                    <Grid item>
                    <SearchIcon className={classes.block} color="inherit" />
                    </Grid>
                    <Grid item xs>
                    <TextField
                        fullWidth
                        placeholder="Search by email address, phone number, or user UID"
                        InputProps={{
                        disableUnderline: true,
                        className: classes.searchInput
                        }}
                    />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.addUser}
                        >
                            Add user
                        </Button>
                        <Tooltip title="Reload">
                            <IconButton>
                                <RefreshIcon className={classes.block} color="inherit" />
                            </IconButton>
                        </Tooltip>
                    </Grid>  
                </Grid>        
            </Toolbar>
      </AppBar>        
    )
  }
}
