import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Popover, TextField, IconButton } from '@material-ui/core';
import { styles } from "./styles";
import { connect } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import TweetCard from "../TweetAnnotation/TweetCard/TweetCard";
import MaterialTable from 'material-table'
import TweetItem from '../TweetAnnotation/TweetItem/TweetItem';
import { fetchTagsByEvent,addAnnotation } from '../../../actions/annotationActions';
import SendIcon from "@material-ui/icons/Send"
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'

const initialState = {
  since: null,
  until: null,
  anchorEl: null,
  tag: '',
}

class FilteredTweetsTable extends React.Component {

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
    const tweets = this.props.filteredTweets;
    // console.log(tweets)

    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className={classes.contentWrapper}>
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
                  { title: 'Tweet', field: 'text'},
                  // , render: rowData => <TweetItem tweet={rowData} eventId={eventId} /> },
                ]}
                data={tweets}
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

FilteredTweetsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  filteredTweets: state.filterReducer.filteredTweets,
  annotations: state.annotationReducer.annotations,
})

const mapDispatchToProps = {
  fetchTagsByEvent: fetchTagsByEvent,
  addAnnotation: addAnnotation,
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(withStyles(styles)(FilteredTweetsTable)));