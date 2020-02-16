import React from 'react';
import PropTypes from 'prop-types';
import firebase from "firebase";
import { withStyles } from '@material-ui/core/styles';
import { styles } from "./styles";
import { Paper, Popover, TextField, IconButton, Grid, Button, Modal, Snackbar, Tooltip } from '@material-ui/core';
import { connect } from 'react-redux';
import TweetCard from "../TweetCard/TweetCard";
import MaterialTable, { MTableToolbar } from 'material-table'
import TweetsChart from '../../TweetsChart/TweetsChart'
import TweetItem from '../TweetItem/TweetItem';
import { fetchTagsByEvent, addAnnotation } from '../../../../actions/annotationActions';
import { Send as SendIcon, Search as SearchIcon, Close as CloseIcon, Error as ErrorIcon } from "@material-ui/icons"
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import FilterForm from "../../TweetFilter/FilterForm";
import moment from "moment";
import { setFilter, clearFilterSubmit, restorePrevFilter } from "../../../../actions/filterActions";

const fetchErrorText = "Something went wrong with your request"

const initialState = {
  since: null,
  until: null,
  anchorEl: null,
  tag: '',
  searchModalShow: false,
  currentData: {}, // To maintain the current view, if the new request fails
  fetchErrorMsg: "",
}


class TweetAnnotationTable extends React.Component {

  tableRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = initialState;
    this.taggedTweet = null;
    this.startTimestamp = Date.now();
    this.endTimestamp = Date.now();
  }

  updateTimePeriod = (area) => {
    this.setState({
      since: area && area.left,
      until: area && area.right
    });

    // Update filter to use `since` and `until` as the start and end timestamps respectively
    if (this.props.filterSet) {
      this.props.setFilter({
        ...this.props.filter,
        startDate: area ? (area && area.left).valueOf() : this.startTimestamp,
        endDate: area ? (area && area.right).valueOf() : this.endTimestamp
      });
    }
    else {
      this.tableRef.current.state.page = 0;
      this.tableRef.current.state.query.page = 0;
      this.tableRef.current.onQueryChange();
    }
  }

  onTagChange = (event) => {
    this.setState({
      tag: event.target.value
    })
  }

  componentDidMount() {
    this.props.setFilter({}); // Reset to a clean filter for a new event
    this.props.fetchTagsByEvent(this.props.eventId);
  }

  componentDidUpdate(prevProps) {
    // When props update, check if there was a filter submit
    // if so, get the remote data for this filter

    if (this.props.submit) {
      // Update the table data
      this.tableRef.current.state.page = 0;
      this.tableRef.current.state.query.page = 0;
      this.tableRef.current.onQueryChange();
    }
  }

  addAnnotation = () => {
    this.props.addAnnotation(this.state.tag, this.taggedTweet, this.props.eventId)
    this.handleClosePopover()
  };

  handleClosePopover = () => {
    this.setState({
      anchorEl: null,
      tag: '',
    });
    document.activeElement.blur();
    this.taggedTweet = null;
  };

  openPopOver = (event, taggedTweet) => {
    this.taggedTweet = taggedTweet;
    this.setState({
      anchorEl: event.currentTarget,

    });
  };

  renderToolbar = (matTableProps, eventInfo) => {
    const { classes } = this.props;
    const disabled = eventInfo ? eventInfo.big_query_table === null : true;

    return (
      <div className={classes.MTableToolbarContainer}>
        <MTableToolbar {...matTableProps} />
        <Tooltip title={disabled ? "Create a BigQuery table to enable search" : ""}>
          <span>
            <Button
              disabled={disabled}
              variant="contained"
              color="default"
              className={classes.noFloatButton}
              onClick={() => this.setState({ searchModalShow: true, fetchErrorMsg: "" })}
            >
              <SearchIcon />
              Search
          </Button>
          </span>
        </Tooltip>
      </div>
    );
  }

  fetchRemoteData = (query) => {
    this.props.clearFilterSubmit();

    let request;
    if (this.props.filterSet) {
      request = this.tweetFilteredFetch(query);
    }
    else {
      request = this.tweetFetch(query);
    }
    return new Promise((resolve, _) => {
      request.then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
        .then(result => {
          const currentData = { data: result.tweets, page: result.meta && result.meta.page - 1, totalCount: result.meta && result.meta.total_count };
          this.setState({ currentData });
          resolve(currentData);
        })
        .catch(e => {
          this.setState({ fetchErrorMsg: fetchErrorText });
          this.props.restorePrevFilter();
          resolve(this.state.currentData);
        });
    })
  }

  tweetFetch = (query) => {
    let url = `https://epicapi.gerard.space/tweets/${this.props.eventId}/?page=${query.page + 1}&count=${query.pageSize}`

    if (this.state.since !== null && this.state.until !== null) {
      url = url + `&since=${this.state.since.toISOString()}&until=${this.state.until.toISOString()}`
    }
    return firebase.auth().currentUser.getIdToken(/* forceRefresh */ false).then(idToken => {
      return fetch(url, {
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${idToken}`,
        }
      });
    })
  }

  tweetFilteredFetch = (query) => {
    return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
      const queryParams = Object.keys(this.props.filter).reduce((acc, key) => {
        if (!this.props.filter[key] || key === "eventName") {
          // Don't include the eventName key value pair and any keys with null values
          return acc;
        }

        // Generate query params string
        if (acc.length > 0) {
          return `${acc}&${key}=${this.props.filter[key].toString().replace(' ', '+')}`;
        }
        else {
          return `${key}=${this.props.filter[key].toString().replace(' ', '+')}`;
        }
      }, "");

      return fetch(`http://localhost:8080/filtering/${this.props.eventId}?${queryParams}&page=${query.page + 1}&count=${query.pageSize}`, // TODO: Are page and count configurable?
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${idToken}`
          }
        }
      )
    });
  }

  render() {
    const { classes } = this.props;
    const eventId = this.props.eventId;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    // Grab the start and end times of from the event
    const eventInfo = this.props.events.reduce((event, curEvent) => {
      if (curEvent.normalized_name === eventId) {
        return curEvent
      }
      return event;
    }, null);

    if (eventInfo && eventInfo.activity && eventInfo.big_query_table) {
      this.startTimestamp = eventInfo.created_at;

      if (eventInfo.activity[eventInfo.activity.length - 1].type == "PAUSE_EVENT") {
        this.endTimestamp = eventInfo.activity[eventInfo.activity.length - 1].time;
      }
      else {
        this.endTimestamp = Date.now();
      }
    }

    return (
      <div className={classes.contentWrapper}>
        <Paper className={classes.chartPaper}>
          <TweetsChart annotateEvent={eventId} updateTimePeriod={this.updateTimePeriod} startTimestamp={this.startTimestamp} endTimestamp={this.endTimestamp} />
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
                title={`${this.props.eventId} Tweets`.toUpperCase()}
                tableRef={this.tableRef}
                columns={[
                  { title: 'Tweet', field: 'text', render: rowData => <TweetItem tweet={rowData} eventId={eventId} /> },
                ]}
                data={this.fetchRemoteData}
                options={{
                  pageSize: 10,
                  search: false,
                  showTitle: true,
                  toolbar: true,
                  detailPanelType: "single",
                  actionsColumnIndex: -1,
                  pageSizeOptions: [10, 20, 30],
                }}
                localization={{
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
                      this.openPopOver(event, rowData)
                    }
                  }
                ] : []
                }
                components={{
                  Toolbar: (props) => this.renderToolbar(props, eventInfo),
                }}
                onChangePage={() => { console.log('called 2') }}
              />
            </Grid>
          </main>
        </Paper>
        <Modal open={this.state.searchModalShow} onClose={() => this.setState({ searchModalShow: false })}>
          <div className={classes.modalContainer}>
            <FilterForm
              eventId={this.props.eventId}
              startTimestamp={this.state.since ? moment(this.state.since).valueOf() : this.startTimestamp}
              endTimestamp={this.state.until ? moment(this.state.until).valueOf() : this.endTimestamp}
              closeForm={() => this.setState({ searchModalShow: false })}
            />
          </div>
        </Modal>

        <Snackbar
          open={this.state.fetchErrorMsg.length > 0}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          onClose={(event, reason) => {
            if (reason === "clickaway") return
            this.setState({ fetchErrorMsg: "" })
          }}
          message={
            <div>
              <ErrorIcon className={classes.fetchMessage} />
              <span className={classes.fetchMessage}>{this.state.fetchErrorMsg}</span>
            </div>
          }
          action={[
            <IconButton key="close" aria-label="Close" color="inherit" onClick={() => this.setState({ fetchErrorMsg: "" })}>
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div >
    );
  }
}

TweetAnnotationTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  events: state.eventsReducer.events,
  annotations: state.annotationReducer.annotations,
  tweets: state.filterReducer.tweets,
  page: state.filterReducer.page,
  totalCount: state.filterReducer.totalCount,
  submit: state.filterReducer.submit,
  filterSet: state.filterReducer.filterSet,
  filter: {
    startDate: state.filterReducer.startDate,
    endDate: state.filterReducer.endDate,
    allWords: state.filterReducer.allWords,
    anyWords: state.filterReducer.anyWords,
    phrase: state.filterReducer.phrase,
    notWords: state.filterReducer.notWords,
  }
})
const mapDispatchToProps = {
  fetchTagsByEvent,
  addAnnotation,
  setFilter,
  clearFilterSubmit,
  restorePrevFilter
}


export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(withStyles(styles)(TweetAnnotationTable)));