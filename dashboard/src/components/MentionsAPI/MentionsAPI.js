import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { styles } from "./styles";
import { connect } from 'react-redux';
import { fetchMentions } from "../../actions/mentionActions";
import MaterialTable from 'material-table'
import Header from "../common-components/Header/Header";

class MentionsAPI extends Component {
  componentDidMount() {
    this.props.fetchMentions();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.Main}>
                <Header onDrawerToggle={this.props.onDrawerToggle} title="Mentions API" />

                <main className={classes.mainContent}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} >
                            <MaterialTable
                                // className={classes.table}
                                columns={[
                                    { title: "User ID", field: 'user_id', },
                                    { title: 'Screen names', field: 'user', render: rowData =>
                                            <a href={"https://www.twitter.com/" + rowData.user[rowData.user.length-1]} target="_blank">{rowData.user[rowData.user.length-1]}</a>
                                    },
                                    { title: 'Times Mentioned', field: 'times_mentioned' },
                                    { title: 'Total Retweets', field: 'total_retweets' },
                                    { title: 'Total Likes', field: 'total_likes' },

                                ]}
                                options={{ search: false, paging: true, actionsColumnIndex: -1, pageSize:20, pageSizeOptions: [10,20,30] }}
                                //data={this.props.mentions.filter(mention => mention.disabled)}
                                data={
                                  query => 
                                    new Promise( (resolve, reject) => {
                                      // Note: this does not work for the bombcyclone2019 event ${normalized_name}             
                                      let url = `https://epicapi.gerard.space/mentions/winter?page=${query.page + 1}&count=${query.pageSize}`
                                      fetch(url)
                                      .then(response => response.json())                  
                                      .then(result => {                    
                                        resolve({
                                          data: result.mentions,
                                          page: result.meta.page -1,
                                          totalCount: result.meta.total_count,
                                        })
                                      })
                                    })
                                }
                                title={
                                  "Most Mentioned Users"
                                  
                                }
                            />
                        </Grid>

                    </Grid>
                </main>
            </div>
    )
  }
}

MentionsAPI.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  mentions: state.mentionReducer.mentions
});

export default connect(mapStateToProps, { fetchMentions: fetchMentions })(withStyles(styles)(MentionsAPI));
