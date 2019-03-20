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



let counter = 0;
function createData(name, calories, fat) {
  counter += 1;
  return { id: counter, name, calories, fat };
}

class CustomPaginationActionsTable extends React.Component {
  componentDidMount() {    
    this.props.fetchEvents();    
  }

  componentWillReceiveProps(nextProps) {        
    if(nextProps.newEvent) {
      this.props.myevents.unshift(nextProps.newEvent);
    }
  }

  _onLinkClickHandler = (type, normalized_name) => {
    this.props.modifyEvents(type,normalized_name);
  }
  state = {
    rows: [
      createData('Cupcake', 305, 3.7),
      createData('Donut', 452, 25.0),
      createData('Eclair', 262, 16.0),
      createData('Frozen yoghurt', 159, 6.0),
      createData('Gingerbread', 356, 16.0),
      createData('Honeycomb', 408, 3.2),
      createData('Ice cream sandwich', 237, 9.0),
      createData('Jelly Bean', 375, 0.0),
      createData('KitKat', 518, 26.0),
      createData('Lollipop', 392, 0.2),
      createData('Marshmallow', 318, 0),
      createData('Nougat', 360, 19.0),
      createData('Oreo', 437, 18.0),
    ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
    page: 0,
    rowsPerPage: 5,
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
    const thArray = ["Event Name", "Description", "Keywords", "Status", "Start/Pause"];
   
    const rows = this.props.myevents;
    const tablecontents = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
      let keywords = "";
      row.keywords.map(kw => {
        keywords += kw + ","
        return keywords
      });
      keywords = keywords.replace(/,\s*$/, "");
      const button = row.status === "NOT_ACTIVE" ?  
      <a href="# " onClick={() => {this._onLinkClickHandler("start", row.normalized_name)}}><PlayArrow className={classes.icon} id={"start-"+row.normalized_name}/></a> 
      : 
      <a href="# " onClick={() => {this._onLinkClickHandler("pause", row.normalized_name)}}><Pause className={classes.icon} id={"pause-"+row.normalized_name}/></a> 
      return (
        <TableRow key={row.normalized_name}>
          <TableCell align="right">{row.name}</TableCell>
          <TableCell align="right">{row.description}</TableCell>
          <TableCell align="right">{keywords}</TableCell>
          <TableCell align="right">{row.status}</TableCell>
          <TableCell align="right">{button}</TableCell>
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
                     return <TableCell align="right" key={ key }>{ prop }</TableCell>
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
                  rowsPerPageOptions={[5, 10, 25]}
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