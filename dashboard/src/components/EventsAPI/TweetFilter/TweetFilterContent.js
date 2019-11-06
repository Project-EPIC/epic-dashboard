import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
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
import { List, ListItem, ListItemText, ListItemIcon, Paper,Tooltip } from '@material-ui/core';
// import TweetsChart from '../TweetsChart/TweetsChart';
import FilterForm from './FilterForm';
import FilterdTweetsTable from './FilteredTweetsTable';


class TweetFilterContent extends React.Component {

    componentDidMount() {
    }


    render() {
        const { classes } = this.props;
        return (
            <div>
                <FilterForm eventId={this.props.eventId}></FilterForm>  
                <FilterdTweetsTable></FilterdTweetsTable>
            </div>
        )       
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