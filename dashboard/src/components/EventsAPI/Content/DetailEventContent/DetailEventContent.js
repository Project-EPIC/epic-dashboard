import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import { connect } from 'react-redux';
import { fetchEvent } from "../../../../actions/eventActions";
import { Route } from "react-router-dom";
import Header from "../../../common-components/Header/Header";
import TweetAnnotationTable from "../../TweetAnnotation/TweetAnnotationTable/TweetAnnotationTable";
import { Tabs, Tab } from "@material-ui/core";
import { NavLink } from 'react-router-dom'
import ListMentions from "../../ListMentions/ListMentions";
import ListMedia from "../../ListMedia/ListMedia";
import EventDashboard from "../../EventDashboard/EventDashboard";


const navigation = (event, eventId) => {
  let nav = [
  {
    url: `/events/${eventId}/`,
    label: "Tweets",
    component: TweetAnnotationTable,
  },
  {
    url: `/events/${eventId}/dashboard`,
    label: "Dashboard",
    component: EventDashboard,
  },

]
if (event && event.status === "NOT_ACTIVE") {
  nav.push({
    url: `/events/${eventId}/mentions`,
    label: "Mentions",
    component: ListMentions,
  },
  {
    url: `/events/${eventId}/media`,
    label: "Media",
    component: ListMedia,
  })
}
return nav
}

class DetailEventContent extends Component {



  state = {
    value: window.location.pathname,
  };

  componentDidMount() {
    this.props.fetchEvent(this.props.match.params.eventId);
  }



  handleChange = (event, value) => {
    this.setState({ value });
  };


  render() {
    const { classes, match} = this.props;
    const { params } = match;
    const { value } = this.state;
    const event = this.props.events.find((o) => {
      return o.normalized_name === params.eventId;
    });

    const title = `Event detail: ${params.eventId}`
    const eventsId = params.eventId;

    const renderTabs =  () =>  <Tabs value={value} onChange={this.handleChange} >
      {  navigation(event, eventsId).map(
        nav => <Tab key={nav.url} component={NavLink} to={nav.url} value={nav.url} label={nav.label} />
      )}
      </Tabs>
    

    return (
      <div className={classes.Main}>
        <Header onDrawerToggle={this.props.onDrawerToggle} title={title} renderTabs={renderTabs} backLink="/events/"/>

        <main className={classes.mainContent}>
        {navigation(event,eventsId).map(
          nav => <Route exact key={nav.url} path={nav.url} render={() => <nav.component eventId={eventsId}/>} />
        )}

      

        </main>
      </div>

    );
  }
}

DetailEventContent.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  events: state.eventsReducer.events,
});

const mapDispatchToProps = {
  fetchEvent: fetchEvent,
  
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DetailEventContent));
