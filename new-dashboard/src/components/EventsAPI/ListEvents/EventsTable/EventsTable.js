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




class CustomPaginationActionsTable extends React.Component {
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
    });
    this.setState({rows: events})
  }
  state = {
    rows: [],
    page: 0,
    rowsPerPage: 50,
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { rowsPerPage, page } = this.state;    
    const thArray = ["Event Name", "Description", "Status", "Start/Pause"];
    const rows = this.props.myevents;
    const tablecontents = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
      // let keywords = "";
      // row.keywords.map(kw => {
      //   keywords += kw + ","
      //   return keywords
      // });
      // keywords = keywords.replace(/,\s*$/, "");
      const button = row.status === "ACTIVE" ?  
      <a  href="#" onClick={(e) => {e.preventDefault();this._onLinkClickHandler("NOT_ACTIVE", row.normalized_name)}}><Pause className={classes.icon} id={"pause-"+row.normalized_name}/></a>
      :
      <a  href="#" onClick={(e) => {e.preventDefault();this._onLinkClickHandler("ACTIVE", row.normalized_name)}}><PlayArrow className={classes.icon} id={"start-"+row.normalized_name}/></a> 
      return (
        <TableRow key={row.normalized_name}>
          <TableCell align="left">{row.name}</TableCell>
          <TableCell align="left">{row.description}</TableCell>
          {/* <TableCell align="left">{keywords}</TableCell> */}
          <TableCell align="left">{row.status}</TableCell>
          <TableCell align="left">{button}</TableCell>
        </TableRow>
    )}      
    )
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          
          <Table className={classes.table}>
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