import React, { Component } from 'react'
import RefreshIcon from "@material-ui/icons/Refresh";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
export default class CreateEvent extends Component {
    constructor() {
        super();
        this.state = {
          tags: [],
          name: "",          
          description: ""
        }
      }
      updateTags = (tags) => {    
        this.setState({tags})        
      }
      onChange = name => event => {                        
        this.setState(
          { [name]: event.target.value }
       );
      }
      onSubmit = (e) => {
        e.preventDefault();
        var keywords = this.state.tags              
        const newEvent = {
            name: this.state.name,
            keywords: keywords,
            description: this.state.description            
        }        
        this.props.createEvent(newEvent);        
    }

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
                    
                    <form onSubmit={this.onSubmit}>
                    <Grid item xs>
                    <TextField
                        id="name"
                        label="Event Name"
                        placeholder="Enter Event Name"
                        className={classes.TextField}
                        onChange={this.onChange("name")}
                        value={this.state.name}
                    />
                    </Grid>
                    <Grid item xs>
                    <TextField
                        fullWidth
                        id="description"
                        label="Event Description"
                        placeholder="Enter Event Description"
                        className={classes.TextField}
                        onChange={this.onChange("description")}
                        value={this.state.description}
                    />
                    </Grid>
                    </form>
                    
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.addUser}
                        >
                            Add user
                        </Button>
                    </Grid>  
                </Grid>        
            </Toolbar>
      </AppBar>        
    )
  }
}
