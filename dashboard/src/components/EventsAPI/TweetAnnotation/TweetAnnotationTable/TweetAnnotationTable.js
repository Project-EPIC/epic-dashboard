import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Popover, TextField, IconButton } from '@material-ui/core';
import { styles } from "./styles";
import { connect } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import TweetCard from "../TweetCard/TweetCard";
import MaterialTable, { MTableToolbar } from 'material-table'
import firebase from "firebase";
import TweetsChart from '../../TweetsChart/TweetsChart'
import TweetItem from '../TweetItem/TweetItem';
import { fetchTagsByEvent, addAnnotation } from '../../../../actions/annotationActions';
import SendIcon from "@material-ui/icons/Send"
import SearchIcon from "@material-ui/icons/Search"
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import Button from "@material-ui/core/Button"
import Modal from "@material-ui/core/Modal";
import FilterForm from "../../TweetFilter/FilterForm";
import moment from "moment";
import { setFilter } from "../../../../actions/filterActions";

const initialState = {
  since: null,
  until: null,
  anchorEl: null,
  tag: '',
  searchModalShow: false,
}


class TweetAnnotationTable extends React.Component {

  tableRef = React.createRef();
  startTimestamp = null;
  endTimestamp = null;

  constructor(props) {
    super(props);
    this.state = initialState;
    this.taggedTweet = null;
  }

  updateTimePeriod = (area) => {
    this.setState({
      since: area && area.left,
      until: area && area.right
    });

    // Update filter to use `since` and `until` as the start and end timestamps respectively
    if (this.props.filterSet) {
      console.log("FILTERING")
      this.props.setFilter({
        ...this.props.filter,
        startDate: area ? (area && area.left).valueOf() : this.startTimestamp,
        endDate: area ? (area && area.right).valueOf() : this.endTimestamp
      });
    }
    else {
      console.log("TWEETS")
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
    this.props.fetchTagsByEvent(this.props.eventId);
  }

  componentDidUpdate(prevProps) {
    // When props update, check if the filter has changed
    // If so update the tweets table
    const filterChanged = Object.keys(this.props.filter).reduce((acc, key) => {
      return acc || this.props.filter[key] !== prevProps.filter[key]
    }, false)
    console.log(this.props)
    console.log(filterChanged)
    if (filterChanged) {
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

  tweetFetch = (query) => {
    return new Promise((resolve, _) => {
      let url = `https://epicapi.gerard.space/tweets/${this.props.eventId}/?page=${query.page + 1}&count=${query.pageSize}`

      if (this.state.since !== null && this.state.until !== null) {
        url = url + `&since=${this.state.since.toISOString()}&until=${this.state.until.toISOString()}`
      }
      firebase.auth().currentUser.getIdToken(/* forceRefresh */ false).then(idToken => {
        fetch(url, {
          headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${idToken}`,
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
            resolve({ data: result.tweets, page: result.meta && result.meta.page - 1, totalCount: result.meta && result.meta.total_count })
          })
          .catch(e => {
            resolve({ tweets: [], page: 0, totalCount: 0 })
          });
      })
    })
  }

  tweetFilteredFetch = (query) => {
    return new Promise((resolve, _) => {
      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
        console.log(this.props.filter)
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

        fetch(`http://localhost:8080/filtering/${this.props.eventId}?${queryParams}&page=${query.page + 1}&count=${query.pageSize}`, // TODO: Are page and count configurable?
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${idToken}`
            }
          }
        )
          .then(response => {
            if (response.status === 200) {
              return response.json()
            }
            throw new Error(response.statusText)
          })
          .then(result => {
            resolve({ data: result.tweets, page: result.meta && result.meta.page - 1, totalCount: result.meta && result.meta.total_count });
          }
          ).catch(e => {
            resolve({ data: [], page: 0, totalCount: 0 });
          });
      });
    })
  }

  render() {
    const { classes } = this.props;
    const eventId = this.props.eventId;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    // Grab the start and end times of from the event
    const { events } = this.props;
    this.startTimestamp = events.length > 0 ? events[0].created_at : Date.now();
    this.endTimestamp = events.length > 0 ? events[0].activity[events[0].activity.length - 1].time : Date.now();

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
                data={(query) => {
                  console.log(this.props)
                  if (this.props.filterSet) {
                    return this.tweetFilteredFetch(query);
                  }
                  else {
                    return this.tweetFetch(query);
                  }
                }}
                onChangePage={(page) => console.log("hi")}
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
                  Toolbar: props =>
                    (
                      <div className={classes.MTableToolbarContainer}>
                        <MTableToolbar {...props} />
                        <Button variant="contained" color="default" className={classes.noFloatButton} onClick={() => this.setState({ searchModalShow: true })}>
                          <SearchIcon />
                          Search
                        </Button>
                      </div>
                    ),
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
  setFilter
}


export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(withStyles(styles)(TweetAnnotationTable)));