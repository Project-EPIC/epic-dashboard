import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Popover, TextField, IconButton } from '@material-ui/core';
import { styles } from "./styles";
import { connect } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import TweetCard from "../TweetCard/TweetCard";
import MaterialTable from 'material-table'
import firebase from "firebase";
import TweetsChart from '../../TweetsChart/TweetsChart'
import TweetItem from '../TweetItem/TweetItem';
import { fetchTagsByEvent,addAnnotation } from '../../../../actions/annotationActions';
import SendIcon from "@material-ui/icons/Send"
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'

const initialState = {
  since: null,
  until: null,
  anchorEl: null,
  tag: '',
}


class TweetAnnotationTable extends React.Component {

  tableRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = initialState;
    this.updateTimePeriod = this.updateTimePeriod.bind(this)
    this.taggedTweet = null;
  }

  
  
  updateTimePeriod(area) {
    this.setState({
      since: area && area.left,
      until: area && area.right
    });
    this.tableRef.current.state.page = 0;
    this.tableRef.current.state.query.page = 0;
    this.tableRef.current.onQueryChange();
  }

  onTagChange = (event) => {
    this.setState({
      tag: event.target.value
    })
  }

  componentDidMount() {
    this.props.fetchTagsByEvent(this.props.eventId);
  }

  addAnnotation = () => {
    this.props.addAnnotation(this.state.tag, this.taggedTweet, this.props.eventId)
    this.handleClosePopover()
  };

  handleClosePopover = () => {
    this.setState({
      anchorEl: null,
      tag:'',
    });
    document.activeElement.blur();
    this.taggedTweet = null;
  };

  openPopOver = (event,taggedTweet) => {
    this.taggedTweet = taggedTweet;
    this.setState({
      anchorEl: event.currentTarget,
      
    });
  };



  render() {
    const { classes } = this.props;
    const eventId = this.props.eventId;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className={classes.contentWrapper}>
        <Paper className={classes.chartPaper}>
          <TweetsChart annotateEvent={eventId} updateTimePeriod={this.updateTimePeriod} />
        </Paper>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClosePopover}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}

          transformOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
        >
          <div className={classes.rootInput}>
            <TextField

              id="tweet-annotation"
              placeholder="Annotate tweet"
              value={this.state.tag || ''}
              className={classes.input}
              margin="dense"
              autoFocus
              onChange={this.onTagChange}
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  this.addAnnotation()
                }
              }}
            />

            <IconButton color="primary" className={classes.iconButton} aria-label="Submit tweet annotation" onClick={this.addAnnotation}>
              <SendIcon />
            </IconButton>
          </div>
        </Popover>
        <Paper className={classes.root}>
          <main className={classes.mainContent}>
            <Grid item xs={12} >
              <MaterialTable
                tableRef={this.tableRef}
                columns={[
                  { title: 'Tweet', field: 'text', render: rowData => <TweetItem tweet={rowData} eventId={eventId} /> },
                ]}
                data={
                  query =>
                    new Promise((resolve, reject) => {
                      // Note: this does not work for the bombcyclone2019 event                  
                      let url = `https://epicapi.gerard.space/tweets/${eventId}/?page=${query.page + 1}&count=${query.pageSize}`
                      if (this.state.since !== null && this.state.until !== null) {
                        url = url + `&since=${this.state.since.toISOString()}&until=${this.state.until.toISOString()}`
                      }
                      firebase.auth().currentUser.getIdToken(/* forceRefresh */ false).then(idToken => {
                        fetch(url, {
                          headers: {
                            'Authorization': `Bearer ${idToken}`,
                          }
                        })
                        .then(response => {
                          if (response.status === 200) {
                            return response.json();
                          } else {
                            throw new Error(response.statusText);
                          }
                        })  
                        .then(result => {
                            resolve({
                              data: result.tweets,
                              page: result.meta && result.meta.page - 1,
                              totalCount: result.meta && result.meta.total_count,
                            })
                          })
                        .catch(e => {
                          
                            resolve({
                              data: [],
                              page: 0,
                              totalCount: 0
                            })
                          })
                      });
                    })
                }

                options={{
                  pageSize: 10,
                  search: false,
                  showTitle: false,
                  toolbar: false,
                  detailPanelType:"single",
                  actionsColumnIndex: -1,
                  pageSizeOptions: [10, 20, 30],
                }}
                localization= {{
                  body: {
                    emptyDataSourceMessage: "No tweets collected so far."
                  }
                }}
                onRowClick={(event, rowData, togglePanel) => togglePanel()}
                detailPanel={rowData => {
                  return (
                    <TweetCard tweet={rowData} eventName={eventId} />
                  )
                }}
                actions={isWidthUp('sm', this.props.width) ? [
                  {
                    icon: 'edit',
                    tooltip: 'Annotate tweet',
                    onClick: (event, rowData) => {
                      this.openPopOver(event,rowData)
                    }
                  }
                ]:[]}
              />
            </Grid>
          </main>
        </Paper>
      </div>
    );
  }
}

TweetAnnotationTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  annotations: state.annotationReducer.annotations,
})
const mapDispatchToProps = {
  fetchTagsByEvent: fetchTagsByEvent,
  addAnnotation: addAnnotation,

}


export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(withStyles(styles)(TweetAnnotationTable)));