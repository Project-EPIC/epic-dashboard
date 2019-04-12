import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { styles } from "./styles";
import { connect } from 'react-redux';
import { fetchEvents, modifyEvents } from "../../../actions/eventActions";
import Grid from "@material-ui/core/Grid";
import TweetCard from "../TweetCard/TweetCard";

import MaterialTable from 'material-table'


class TweetAnnotationTable extends React.Component {
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
  // componentDidMount() {    
  //   this.props.fetchEvents();    
  // }

  // componentWillReceiveProps(nextProps) {        
  //   if(nextProps.newEvent) {
  //     this.props.myevents.unshift(nextProps.newEvent);
  //   }
  // }

  // _onLinkClickHandler = (status, normalized_name) => {
  //   this.props.modifyEvents(status, normalized_name);
  //   let events = [...this.state.rows];
  //   events.find((o, i) => {     
  //     if (o.normalized_name === normalized_name) {
  //         events[i].status = status
  //         return true; // stop searching
  //     }
  //     return false;
  //   });
  //   this.setState({rows: events})
  // }

  // handleChangePage = (event, page) => {
  //   this.setState({ page });
  // };

  // handleChangeRowsPerPage = event => {
  //   this.setState({ page: 0, rowsPerPage: event.target.value });
  // };


  // toggleOpen = (row, state) => {    
  //   this.setState({ 
  //     open: state,
  //     detailedViewRow: row 
  //   });
  // };

  // handleClose = () => {
  //   this.setState({ 
  //     open: false,
  //     detailedViewRow: null 
  //   });
  // };

  // displayDate = (date) => {
  //   var d = new Date(date);    
  //   return d.toString()
  // }

  render() {
    const { classes } = this.props;    
    return (
      <Paper className={classes.root}>      
        <main className={classes.mainContent}>
          <Grid item xs={12} >
          <MaterialTable
              columns={[
                { title: 'Name', field: 'name' },
                { title: 'Surname', field: 'surname' },
                { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
                {
                  title: 'Birth Place',
                  field: 'birthCity',
                  lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                },
              ]}
              data={[
                { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
                { name: 'Zerya Betül', surname: 'Baran', birthYear: 1987, birthCity: 63 },
              ]}
              title="Detail Panel Example"
              detailPanel={rowData => {
                return (
                  <TweetCard classes={classes}/>
                )
              }}
            />
          </Grid>
        </main>
      </Paper>
    );
  }
}

TweetAnnotationTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  myevents: state.eventsReducer.myevents,
  newEvent: state.eventsReducer.newEvent    
});


export default connect(mapStateToProps, {fetchEvents: fetchEvents, modifyEvents: modifyEvents})(withStyles(styles)(TweetAnnotationTable));