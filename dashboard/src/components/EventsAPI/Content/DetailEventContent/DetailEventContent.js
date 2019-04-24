import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import { Route } from "react-router-dom";
import Header from "../../../common-components/Header/Header";
import TweetAnnotationTable from "../../TweetAnnotation/TweetAnnotationTable/TweetAnnotationTable";
import { Tabs, Tab } from "@material-ui/core";
import { NavLink } from 'react-router-dom'
import ListMentions from "../../ListMentions/ListMentions";
import {withRouter} from 'react-router-dom';



class DetailEventContent extends Component {

  state = {
    value: 0,
  };


  handleChange = (event, value) => {
    this.setState({ value });
  };


  render() {
    const { classes, match, location} = this.props;
    const { params } = match;
    const { value } = this.state;

    const title = `Event detail: ${params.eventId}`

    const renderTabs = (eventId) => () => {
      return <Tabs value={value} onChange={this.handleChange} >
        <Tab component={NavLink} to={`/events/${eventId}/`} label="Tweets" />
        <Tab component={NavLink} to={`/events/${eventId}/mentions`} label="Mentions" />
      </Tabs>
    }

    return (
      <div className={classes.Main}>
        <Header onDrawerToggle={this.props.onDrawerToggle} title={title} renderTabs={renderTabs(params.eventId)} backLink="/eventsapi/"/>

        <main className={classes.mainContent}>

          <Route exact path="/events/:eventId/" render={(props) => (<TweetAnnotationTable annotateEvent={params.eventId} {...props} />)} />
          <Route exact path="/events/:eventId/mentions" render={(props) => (<ListMentions eventId={params.eventId} {...props} />)} />

        </main>
      </div>

    );
  }
}

DetailEventContent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(DetailEventContent));
