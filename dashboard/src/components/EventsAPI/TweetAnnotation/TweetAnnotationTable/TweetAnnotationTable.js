import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { styles } from "./styles";
import { connect } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import TweetCard from "../TweetCard/TweetCard";
import MaterialTable from 'material-table'


class TweetAnnotationTable extends React.Component {

  render() {
    const { classes } = this.props;    
    const title = `Tweet Annotation API for ${this.props.annotateEvent}`
    return (           
      <Paper className={classes.root}>      
        <main className={classes.mainContent}>
          <Grid item xs={12} >
          <MaterialTable
              columns={[
                {
                  title: 'Avatar',
                  field: 'avatar',
                  render: rowData => (
                    <img
                      style={{ height: 36, borderRadius: '50%' }}
                      src={rowData.user.profile_image_url}
                      alt="Avatar"
                    />
                  ),
                },
                { title: 'Text', field: 'text' }, 
                { title: 'Created At', field: 'created_at' },                               
              ]}
              data={                                                
                query => 
                new Promise( (resolve, reject) => {
                  // Note: this does not work for the bombcyclone2019 event                  
                  let url = `https://epicapi.gerard.space/tweets/${this.props.annotateEvent}/?page=${query.page + 1}&count=${query.pageSize}`                  
                  // let url = `http://34.95.114.189/tweets/${this.props.annotateEvent}/?page=${query.page + 1}&count=${query.pageSize}`                  
                  fetch(url)
                  .then(response => response.json())                  
                  .then(result => {                    
                    resolve({
                      data: result.tweets,
                      page: result.meta.page -1,
                      totalCount: result.meta.total_count,
                    })
                  })
                })
              }
              title={title}
              options={{
                pageSize: 10,
                pageSizeOptions: [10,20,30]
              }}
              detailPanel={rowData => {                
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
  annotateEvent: state.eventsReducer.annotateEvent
});



export default connect(mapStateToProps, null)(withStyles(styles)(TweetAnnotationTable));