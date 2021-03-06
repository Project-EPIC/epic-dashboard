import React, { Component } from "react";
import { Route } from "react-router-dom";
import ListEventsContent from "./Content/ListEventsContent/ListEventsContent";
import DetailEventContent from "./Content/DetailEventContent/DetailEventContent";
import { setEventType } from "../../actions/eventActions";
import { connect } from 'react-redux';

export const styles = theme => ({
  Main: {
    minHeight: '100%',
    display: "block",
  },
});



class EventsAPI extends Component {
  async componentDidMount() {
    if (!this.props.eventType) {
      await this.props.setEventType(this.props.match.params.eventType)
    }
  }

  render() {
    const title = "Events Collection";
    const { classes, onDrawerToggle, eventType } = this.props;
    return (
        <div>
          <Route exact path={`/events/${eventType}`} render={(props) => (<ListEventsContent {...props} title={title} classes={classes} onDrawerToggle={onDrawerToggle} />)} />
          <Route path="/events/:eventType/:eventId/" render={(props) => (<DetailEventContent {...props} title={title} classes={classes} onDrawerToggle={onDrawerToggle} />)} />
        </div>
    );
  }
}

const mapStateToProps = state => ({
  eventType: state.eventsReducer.eventType
});

const mapDispatchToProps = {
  setEventType: setEventType,
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsAPI);
