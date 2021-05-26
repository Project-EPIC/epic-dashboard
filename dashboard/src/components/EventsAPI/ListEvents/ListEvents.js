import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { styles } from "./styles";
import { connect } from 'react-redux';
import { fetchEvents } from "../../../actions/eventActions";
import EventTable from './EventTable/EventTable';



class ListEvents extends React.Component {
  

  componentDidMount() {    
    this.props.fetchEvents(this.props.eventType);    
  }

  componentDidUpdate(prevProps) {
    if (prevProps.eventType !== this.props.eventType) {
      this.props.fetchEvents(this.props.eventType);
    }
  }
 
  render() {
    const rows = this.props.events;
    const activeEvents = rows.filter(e => e.status==="ACTIVE");
    const failedEvents = rows.filter(e => e.status==="FAILED");
    const notActiveEvents = rows.filter(e => e.status==="NOT_ACTIVE");
    

    return   (      

      <Grid container spacing={3}>
        {activeEvents.length >0 ?
        <Grid item xs={12} >
         <EventTable title="Active events" data={activeEvents}/>
        </Grid>
        :
        null}
        {failedEvents.length >0 ?
        <Grid item xs={12} >
          <EventTable title="Failed events" data={failedEvents}/>
        </Grid>
        :
        null}
        <Grid item xs={12} >
        <EventTable title="Finished events" data={notActiveEvents}/>
        </Grid>
      </Grid>
    
    );
  }
}

ListEvents.propTypes = {
  classes: PropTypes.object.isRequired,
  eventType: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  events: state.eventsReducer.events,
  eventType: state.eventsReducer.eventType
});

const mapDispatchToProps = {
  fetchEvents: fetchEvents, 
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListEvents));