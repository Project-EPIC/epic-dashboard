import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import ChipInput from 'material-ui-chip-input'
import Button from "@material-ui/core/Button";

export default class DetailedEventDialog extends Component {    
    displayDate = (date) => {
        var d = new Date(date);    
        return d.toString()
    }
      
  render() {           
    return (
      <div>
        <Dialog open={this.props.open} onClose={() => this.props.toggleOpen(false, null)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Detailed Event View for: {this.props.detailedViewRow ? this.props.detailedViewRow.normalized_name : null}</DialogTitle>
            <DialogContent>          
                <Grid container spacing={24}>
                    <Grid item  xs={12} md={12}>
                        <Typography gutterBottom variant="subtitle2">
                            Name
                        </Typography>
                        <Typography component="span">
                            {this.props.detailedViewRow ? this.props.detailedViewRow.name : null}
                        </Typography>
                        <Typography gutterBottom variant="subtitle2">
                            Created At
                        </Typography>
                        <Typography component="span">
                            {this.props.detailedViewRow ? this.displayDate(this.props.detailedViewRow.created_at) : null}
                        </Typography>
                        <Typography gutterBottom variant="subtitle2">
                            Status
                        </Typography>
                        <Typography component="span">
                            {this.props.detailedViewRow ? this.props.detailedViewRow.status : null}
                        </Typography> 
                        <Typography gutterBottom variant="subtitle2">
                        Description
                        </Typography>
                        <Typography component="span">
                            {this.props.detailedViewRow ? this.props.detailedViewRow.description : null}
                        </Typography>              
                    </Grid>
                    <Grid item  xs={12} md={12}>
                        <ChipInput                  
                            value={this.props.detailedViewRow ? this.props.detailedViewRow.keywords : []}                                        
                            label="Keywords"                                                            
                            fullWidth
                            newChipKeyCodes={[13, 188]}
                            margin="dense"
                            disabled
                        />
                    </Grid>
                </Grid>          
            </DialogContent>
            <DialogActions>
                <Button onClick={ () => this.props.toggleOpen(null,false)} color="primary">Close</Button>          
            </DialogActions>
        </Dialog>        
      </div>
    )
  }
}
