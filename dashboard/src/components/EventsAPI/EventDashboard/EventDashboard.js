import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { styles } from "./styles";
import { connect } from 'react-redux';
import { fetchEvent, fetchCounts,modifyEvents } from "../../../actions/eventActions";
import PauseIcon from "@material-ui/icons/Pause"
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { LinearProgress, List, ListItem, ListItemText, Paper } from '@material-ui/core';
import TweetsChart from '../TweetsChart/TweetsChart';


class EventDashboard extends React.Component {

    componentDidMount() {
        this.props.fetchEvent(this.props.eventId);
        this.props.fetchCounts(this.props.eventId);

    }


    render() {
        const rows = this.props.events;
        const classes = this.props.classes;
        const eventId = this.props.eventId;
        const event = rows.find((o) => {
            return o.normalized_name === eventId;
        });
        const totalCount = (this.props.counts[eventId] && this.props.counts[eventId].map((item)=> item.count).reduce((x,y)=> x+y))||0;

        

        if (event !== undefined)
            return (

                <Grid container spacing={24}>

                    <Grid item md={3} xs={12} >
                        <Card className={classes.card}>
                            <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Event details
                                </Typography>
                                <Typography variant="h5" component="h5">
                                    {event.name}

                                </Typography>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Normalized name: <i>{event.normalized_name}</i>
                                </Typography>
                                <Typography variant="body1">
                                    {event.description}
                                </Typography>
                                <Typography variant="body2" gutterBottom color="textSecondary" align="right" >
                                    <i>Created: {event.created_at_str}</i>
                                </Typography>


                            </CardContent>

                        </Card>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Card className={classes.card}>
                            <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Keywords for collection
                                </Typography>
                                
                                <List dense>
                                    {event.keywords.map(keyword =>
                                        <ListItem key={keyword}>
                                            <ListItemText primary={keyword} />
                                        </ListItem>
                                    )}
                                </List>
                            </CardContent>

                        </Card>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Card className={classes.card}>
                            <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Tweets collected
                                </Typography>
                                <Typography variant="h2" component="h2">
                                    {totalCount}

                                </Typography>
                                
                            </CardContent>

                        </Card>
                    </Grid>
                    <Grid item md={3} xs={12} >
                        <Card className={classes.card}>
                            <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Status
                                </Typography>
                                <Typography variant="h5" component="h5">
                                    {event.status==="ACTIVE"?"Collecting data":(event.status==="FAILED"? "Collection failed!":"Not collecting new data")}
                                </Typography>


                                {event.status === "ACTIVE" ?
                                    <LinearProgress />
                                    :
                                    null
                                }
                            </CardContent>
                            <CardActions>
                                {event.status === "ACTIVE" ?
                                    <Button color="default" className={classes.button} onClick={()=> this.props.modifyEvents("NOT_ACTIVE",event.normalized_name)}>
                                        Pause collection
                                        <PauseIcon className={classes.rightIcon} />
                                    </Button>
                                    :
                                    <Button color="default" className={classes.button} onClick={()=> this.props.modifyEvents("ACTIVE",event.normalized_name)}>
                                        Restart collection
                                        <PlayArrowIcon className={classes.rightIcon} />
                                    </Button>
                                }
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} >
                        <Paper className={classes.chartPaper}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Tweets per hour
                                </Typography>
                            <TweetsChart annotateEvent={event.normalized_name} updateTimePeriod={(d)=>(d)} />
                        </Paper>
                    </Grid>
                </Grid>

            );
        else
            return null
    }
}

EventDashboard.propTypes = {
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
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EventDashboard));