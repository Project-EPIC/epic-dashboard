import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import { TablePaginationActionsWrapped } from "../../../common-components/TablePaginationActions/TablePaginationActions";
import { styles } from "./styles";
import { connect } from 'react-redux';
import { fetchEvents, modifyEvents } from "../../../../actions/eventActions";
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Edit from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import ChipInput from 'material-ui-chip-input'
import Button from "@material-ui/core/Button";



class CustomPaginationActionsTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rows: [],
      page: 0,
      rowsPerPage: 50,
      open: false,
      detailedViewRow: null
    };
  }
  componentDidMount() {    
    this.props.fetchEvents();    
  }

  componentWillReceiveProps(nextProps) {        
    if(nextProps.newEvent) {
      this.props.myevents.unshift(nextProps.newEvent);
    }
  }

  _onLinkClickHandler = (status, normalized_name) => {
    this.props.modifyEvents(status, normalized_name);
    let events = [...this.state.rows];
    events.find((o, i) => {     
      if (o.normalized_name === normalized_name) {
          events[i].status = status
          return true; // stop searching
      }
      return false;
    });
    this.setState({rows: events})
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };


  toggleOpen = (row, state) => {    
    this.setState({ 
      open: state,
      detailedViewRow: row 
    });
  };

  handleClose = () => {
    this.setState({ 
      open: false,
      detailedViewRow: null 
    });
  };

  displayDate = (date) => {
    var d = new Date(date);    
    return d.toString()
  }

  render() {
    const { classes } = this.props;
    const { rowsPerPage, page } = this.state;    
    const thArray = ["Event Name", "Description", "Status", "Start/Pause", "Annotate Tweet"];
    const rows = this.props.myevents;
    const tablecontents = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
      const playPauseButton = row.status === "ACTIVE" ?  
      <a  href="# " onClick={(e) => {e.preventDefault();this._onLinkClickHandler("NOT_ACTIVE", row.normalized_name)}}><Pause className={classes.icon} id={"pause-"+row.normalized_name}/></a>
      :
      <a  href="# " onClick={(e) => {e.preventDefault();this._onLinkClickHandler("ACTIVE", row.normalized_name)}}><PlayArrow className={classes.icon} id={"start-"+row.normalized_name}/></a> 
      const annotateTweetButton = <a href="# " onClick={(e) => {e.preventDefault(); this._annotateTweetHandler()}}><Edit className={classes.icon} id={"annotate-"+row.normalized_name}/></a>
      return (         
          <TableRow key={row.normalized_name} onClick={() => this.toggleOpen(row, true)} >
            <TableCell align="left" id={row.normalized_name + '_name'}>{row.name}</TableCell>
            <TableCell align="left" id={row.normalized_name + '_description'}>{row.description}</TableCell>
            <TableCell align="left" id={row.normalized_name + '_status'}>{row.status}</TableCell>
            <TableCell align="left">{playPauseButton}</TableCell>
            <TableCell align="left">{annotateTweetButton}</TableCell>
          </TableRow>                   
    )}      
    )
    return (
      <Paper className={classes.root}>      
      <Dialog open={this.state.open} onClose={() => this.toggleOpen(false, null)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Detailed Event View for: {this.state.detailedViewRow ? this.state.detailedViewRow.normalized_name : null}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container spacing={24}>
              <Grid item  xs={12} md={12}>
              <Typography gutterBottom variant="subtitle2">
                  Name
              </Typography>
              <Typography component="p">
                {this.state.detailedViewRow ? this.state.detailedViewRow.name : null}
              </Typography>
              <Typography gutterBottom variant="subtitle2">
                  Created At
              </Typography>
              <Typography component="p">
                {this.state.detailedViewRow ? this.displayDate(this.state.detailedViewRow.created_at) : null}
              </Typography>
              <Typography gutterBottom variant="subtitle2">
                  Status
              </Typography>
              <Typography component="p">
                {this.state.detailedViewRow ? this.state.detailedViewRow.status : null}
              </Typography> 
              <Typography gutterBottom variant="subtitle2">
                Description
              </Typography>
              <Typography component="p">
                {this.state.detailedViewRow ? this.state.detailedViewRow.description : null}
              </Typography>              
                </Grid>
                <Grid item  xs={12} md={12}>
                  <ChipInput                  
                    value={this.state.detailedViewRow ? this.state.detailedViewRow.keywords : []}                                        
                    label="Keywords"                                                            
                    fullWidth
                    newChipKeyCodes={[13, 188]}
                    margin="dense"
                    disabled
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ () => this.toggleOpen(null,false)} color="primary">Close</Button>          
        </DialogActions>
      </Dialog>
        <div className={classes.tableWrapper}>
          
          <Table className={classes.table} >
            <TableHead>
              <TableRow>                
                 {
                   thArray.map( (prop, key) => {
                     return <TableCell align="left" key={ key }>{ prop }</TableCell>
                   })
                 }                                                          
              </TableRow>
            </TableHead>
            
            <TableBody>
              { tablecontents }
            </TableBody>
            
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50, 100]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={parseInt(rowsPerPage)}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>

          </Table>
        </div>
      </Paper>
    );
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  myevents: state.eventsReducer.myevents,
  newEvent: state.eventsReducer.newEvent    
});


export default connect(mapStateToProps, {fetchEvents: fetchEvents, modifyEvents: modifyEvents})(withStyles(styles)(CustomPaginationActionsTable));