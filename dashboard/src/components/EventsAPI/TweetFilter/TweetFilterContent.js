import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { styles } from "./styles";
import { connect } from 'react-redux';
import { fetchEvent, fetchCounts, modifyEvents, createBigQueryTable } from "../../../actions/eventActions";
import PauseIcon from "@material-ui/icons/Pause"
import Chip from '@material-ui/core/Chip';
import OpenInNewIcon from "@material-ui/icons/OpenInNew"
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import CreateIcon from "@material-ui/icons/Create"
import ReactTimeAgo from 'react-time-ago'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemText, ListItemIcon, Paper, Tooltip } from '@material-ui/core';
// import TweetsChart from '../TweetsChart/TweetsChart';
import FilterForm from './FilterForm';
import FilteredTweetsTable from './FilteredTweetsTable';

class TweetFilterContent extends React.Component {

  componentDidMount() {
  }


  render() {
    const { classes } = this.props;

    // Grab the start and end times of from the event
    const { events } = this.props;
    const startTimestamp = events.length > 0 ? events[0].created_at : Date.now();
    const endTimestamp = events.length > 0 ? events[0].activity[events[0].activity.length - 1].time : Date.now();

    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12} md={12}>
            <FilterForm eventId={this.props.eventId} startTimestamp={startTimestamp} endTimestamp={endTimestamp}></FilterForm>
          </Grid>
          <Grid item xs={12} md={12}>
            <FilteredTweetsTable />
          </Grid>
        </Grid>
      </div>
    );
  }
}

TweetFilterContent.propTypes = {
  classes: PropTypes.object.isRequired,
  eventId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  events: state.eventsReducer.events,
  counts: state.eventsReducer.counts,
});

const mapDispatchToProps = {
  fetchEvent: fetchEvent,
  modifyEvents: modifyEvents,
  fetchCounts: fetchCounts,
  createBigQueryTable: createBigQueryTable,
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TweetFilterContent));