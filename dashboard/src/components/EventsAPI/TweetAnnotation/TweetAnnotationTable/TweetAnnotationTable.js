import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { styles } from "./styles";
import { connect } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import TweetCard from "../TweetCard/TweetCard";
import { fetchEventTweets } from "../../../../actions/eventActions";
import MaterialTable from 'material-table'


class TweetAnnotationTable extends React.Component {
  componentDidMount() {    
    const pageNumber = 1; // TODO
    const numberOfRecords = 100; // TODO
    console.log(`in TweetAnnotationTable: ${this.props.annotateEvent}`);
    this.props.fetchEventTweets(this.props.annotateEvent, pageNumber, numberOfRecords);
  }

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
              options={{
                pageSize: 10,
                pageSizeOptions: [10,20,30]
              }}
              detailPanel={rowData => {
                return (
                  <TweetCard/>
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
  annotateEvent: state.eventsReducer.annotateEvent,   
  annotateTweets: state.eventsReducer.annotateTweets
});

const mapDispatchToProps = {
  fetchEventTweets: fetchEventTweets
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TweetAnnotationTable));