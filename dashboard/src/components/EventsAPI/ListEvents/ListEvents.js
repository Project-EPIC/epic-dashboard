import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { styles } from "./styles";
import { connect } from 'react-redux';
import { fetchEvents, modifyEvents } from "../../../actions/eventActions";
import EventTable from './EventTable/EventTable';



class ListEvents extends React.Component {

  componentDidMount() {    
    this.props.fetchEvents();    
  }

 
  render() {
    const rows = this.props.events;
    const activeEvents = rows.filter(e => e.status==="ACTIVE");
    const failedEvents = rows.filter(e => e.status==="FAILED");
    const notActiveEvents = rows.filter(e => e.status==="NOT_ACTIVE");
    

    return   (      

      <Grid container spacing={24}>
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
};

const mapStateToProps = state => ({
  events: state.eventsReducer.events,
});

const mapDispatchToProps = {
  fetchEvents: fetchEvents, 
  modifyEvents: modifyEvents,
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListEvents));