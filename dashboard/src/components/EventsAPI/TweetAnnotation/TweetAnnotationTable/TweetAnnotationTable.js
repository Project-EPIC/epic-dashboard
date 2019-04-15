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
    const title = `Tweet Annotation API for ${this.props.annotateEvent}`
    // console.log(`in render: ${JSON.stringify(this.props.annotateTweets)}`);
    // const data = this.props.annotateTweets.map((prop, key) => {

    // });
    return (           
      <Paper className={classes.root}>      
        <main className={classes.mainContent}>
          <Grid item xs={12} >
          <MaterialTable
              columns={[
                { title: 'Created At', field: 'created_at' },
                { title: 'Text', field: 'text' },
              ]}
              data={                                
                this.props.annotateTweets ? this.props.annotateTweets.tweets : []
              }
              title={title}
              options={{
                pageSize: 10,
                pageSizeOptions: [10,20,30]
              }}
              detailPanel={rowData => {
                console.log(`rowData: ${JSON.stringify(rowData)}`)
                return (
                  <TweetCard tweet={rowData}/>
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