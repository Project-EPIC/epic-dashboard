import React, { Component } from 'react'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ChipInput from 'material-ui-chip-input'
import { connect } from 'react-redux';
import { createEvent } from "../../../actions/eventActions";

class CreateEvent extends Component {
    constructor() {
        super();
        this.state = {
          tags: [],
          name: "",          
          description: ""
        }
      }
      handleAddChip = (tag) => {    
          let tags = this.state.tags;
          tags.push(tag)
          this.setState({tags})        
      }
      handleDeleteChip = (tag, index) => {
        let tags = this.state.tags;
        tags.splice(index,1);
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
        console.log(`new event: ${JSON.stringify(newEvent)}`)        
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
                    <ChipInput
                        value={this.state.tags}
                        onAdd={(chip) => this.handleAddChip(chip)}
                        onDelete={(chip, index) => this.handleDeleteChip(chip, index)}
                    />                    
                    <Button variant="outlined" color="primary" className={classes.button} type="submit"> Create Event</Button>
                    </form>                                         
            </Toolbar>
      </AppBar>        
    )
  }
}

export default connect(null, { createEvent })(CreateEvent);
