import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { styles } from "./styles";
import { connect } from 'react-redux';
import { fetchMentions } from "../../actions/mentionActions";
import MaterialTable from 'material-table'
import Header from "../common-components/Header/Header";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';


const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);


class MentionsAPI extends React.Component {
  componentDidMount() {
    this.props.fetchMentions();
  }

  state = {
    age: '',
  };

  handleChange = event => {
    this.setState({ age: event.target.value });
  };

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
                                    { title: "User ID", field: 'user_id'},
                                    { title: 'Screen names', field: 'user', render: rowData =>
                                            <a href={"https://www.twitter.com/" + rowData.user[rowData.user.length-1]}>{rowData.user[rowData.user.length-1]}</a>
                                    },
                                    { title: 'Times Mentioned', field: 'times_mentioned' },
                                    { title: 'Total Retweets', field: 'total_retweets' },
                                    { title: 'Total Likes', field: 'total_likes' },

                                ]}
                                options={{ search: false, paging: true, actionsColumnIndex: -1 }}
                                //data={this.props.mentions.filter(mention => mention.disabled)}
                                data={
                                  query => 
                                    new Promise( (resolve, reject) => {
                                      // Note: this does not work for the bombcyclone2019 event ${normalized_name}             
                                      let url = `https://epicapi.gerard.space/mentions/winter?page=${query.page + 1}&count=${query.pageSize}`
                                      //let url = `http://localhost:8080/mentions/${this.props.event_name}?page=${pages}&count=${number_pages}`
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
                                /* actions={[
                                    {
                                        icon: 'add',
                                        tooltip: 'Make user admin',
                                        onClick: (event, rowData) => {
                                            this.props.makeAdmin(rowData);
                                        },
                                    }]} */
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
