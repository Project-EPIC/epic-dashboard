import React, { Component } from 'react'
import AddIcon from '@material-ui/icons/Add';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ChipInput from 'material-ui-chip-input'
import { connect } from 'react-redux';
import { createEvent,clearErrors } from "../../../actions/eventActions";
import Fab from '@material-ui/core/Fab';
import { styles } from "./styles";
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';





class CreateEvent extends Component {
  constructor() {
    super();
    this.state = {
      tags: [],
      name: "",
      open: false,
      waiting: false,
      description: "",
      nameError: "",
      descriptionError: "",
      tagsError: "",
      numEvents: -1,
    }
    this.resetFields = this.resetFields.bind(this)
  }

  componentDidMount() {   

    this.props.clearErrors();
    
  }

  toggleOpen = (state) => () => {
    this.setState({
      open: state,
    });
  };

  handleAdd(...chips) {
    this.setState({
      tags: [...this.state.tags, ...chips]
    })
  }

  handleAddChip = (tag) => {
    let tags = this.state.tags;
    tags.push(tag)
    this.setState({ tags })
  }

  handleDeleteChip = (tag, index) => {
    let tags = this.state.tags;
    tags.splice(index, 1);
    this.setState({ tags })
  }

  onChange = name => event => {
    this.setState(
      { [name]: event.target.value }
    );
  }

  createEvent = (e) => {
    e.preventDefault()
    
    if (this.state.name === "" || this.state.description==="" || this.state.tags.length===0) {
      this.setState(
        {
          nameError: this.state.name === "" ? "Required field!" : "",
          descriptionError: this.state.description === "" ? "Required field!" : "",
          tagsError: this.state.tags.length === 0 ? "Required field!" : "",
        }
      );
      return;
    }
    var keywords = this.state.tags
    const newEvent = {
      name: this.state.name,
      keywords: keywords,
      description: this.state.description
    }

    this.props.createEvent(newEvent)
    this.setState({
      waiting:true,
    })
  }

  resetFields() {
    const currentNumEvents = this.props.events.filter(e => e.status==="ACTIVE").length;
    this.setState({
      numEvents: currentNumEvents,
      tags: [],
      name: "",
      waiting:false,
      open: false,
      description: "",
      nameError: "",
      descriptionError: "",
      tagsError: "",
    })
    this.props.clearErrors();
  }

  wideError() {
    this.setState({
      waiting:false,
    })
  }

  componentWillReceiveProps(nextProps) {
    
    const currentNumEvents =nextProps.events.filter(e => e.status==="ACTIVE").length;
    if (currentNumEvents > this.state.numEvents) {
      // If there's a new event, close modal.
      this.resetFields();
    }
    this.setState({
      numEvents: currentNumEvents,
    });
    const creationError = nextProps.error;

    if (creationError!==""){
      this.wideError();
    }
  }

  render() {
    const { classes } = this.props;
    const creationError = this.props.error;

    return (

      <div>

        <Fab onClick={this.toggleOpen(true)} variant="round" color="secondary" aria-label="Add" className={classes.fab}>
          <AddIcon />
        </Fab>
        <Dialog open={this.state.open} onClose={this.resetFields} aria-labelledby="form-dialog-title">        
        <form onSubmit={this.createEvent}>
          <DialogTitle id="form-dialog-title">Create event</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Create a new event to start collecting data. Introduce keywords to be collected below. There are currently {this.state.numEvents} active collections.
            </DialogContentText>
            <DialogContentText color={"error"}>
              {creationError&& `Error: ${creationError}`}
            </DialogContentText>
            <Grid container spacing={24}>
              <Grid item  xs={12} md={12}>
                <TextField
                  autoFocus
                  required
                  id="name"
                  label="Name"
                  placeholder={this.state.nameError}
                  helperText={this.state.nameError !== "" ? this.state.nameError : "Enter Event name. Must be unique."}
                  className={classes.TextField}
                  onChange={this.onChange("name")}
                  disabled={this.state.waiting}
                  value={this.state.name}
                  error={this.state.nameError !== ""||creationError!== ""}
                  fullWidth
                  margin="dense"
                />
              </Grid>
              <Grid item  xs={12} md={12}>
                <TextField
                  required
                  id="description"
                  label="Description"
                  disabled={this.state.waiting}
                  helperText={this.state.descriptionError !== "" ? this.state.descriptionError : "Enter Event description."}
                  className={classes.TextField}
                  multiline
                  error={this.state.descriptionError !== ""||creationError!== ""}
                  onChange={this.onChange("description")}
                  value={this.state.description}
                  fullWidth
                  margin="dense"
                />
              </Grid>
              <Grid item  xs={12} md={12}>
                <ChipInput                  
                  value={this.state.tags}
                  onAdd={(chip) => this.handleAddChip(chip)}
                  onDelete={(chip, index) => this.handleDeleteChip(chip, index)}
                  label="Search keywords"
                  disabled={this.state.waiting}
                  helperText={this.state.tagsError !== "" ? this.state.tagsError : "Keywords to use to collect tweets."}
                  error={this.state.tagsError !== ""||creationError!== ""}
                  placeholder={"Enter hashtags followed by an Enter"}
                  fullWidth
                  newChipKeyCodes={[13, 188]}
                  margin="dense"
                  onPaste={(event) => {

                    const clipboardText = event.clipboardData.getData('Text')

                    event.preventDefault()

                    this.handleAdd(...clipboardText.split(/(\n|,)/).filter((t) => t !== ',' && t !== '\n' && t.length > 0))

                    if (this.props.onPaste) {
                      this.props.onPaste(event)
                    }
                  }}
                />
              </Grid>
            </Grid>
           
          </DialogContent>
          
          <DialogActions>

            <Button disabled={this.state.waiting} onClick={this.resetFields} color="default">Cancel</Button>

            <Button disabled={this.state.waiting} type="submit"  variant="contained" color="primary">
              {this.state.waiting ? "Creating event..." : "Collect Tweets"}
          </Button>


          </DialogActions>
          </form>

        </Dialog>
        {/* </Drawer> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  error: state.eventsReducer.error,
  events: state.eventsReducer.events
});

export default connect(mapStateToProps, { createEvent: createEvent, clearErrors:clearErrors })(withStyles(styles)(CreateEvent));